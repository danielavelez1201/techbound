
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt");
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

const auth = require("../middleware/auth");

router.get("/authenticate", auth, async (req, res) => {
  console.log("in authentication function");
  try {
    console.log("authenticating, user: ", req.user.userId)
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.route('/signin').post((req, res) => {
  console.log("sign in back-end");

  email = req.body.email;
  password = req.body.password;

  let getUser;
  User.findOne({email: email})
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed. Email not found",
        });
      }
      getUser = user;
      console.log("passwords", password, user.password)
      return bcrypt.compare(password, user.password)
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed. Password invalid",
        });
      }
      else {
        console.log(getUser)
        payload = {
          user: {
            email: getUser.email,
            userId: getUser._id
          }
        }
        console.log(payload)
      }
    
    let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token: jwtToken,
    });
  }

    
  )
  .catch((err) => {
    res.status(401).json({
      message: "Random error",
    });
  });
  });


router.route('/add').post(async (req, res, next) => {

  const formData = req.body;
  const clusterData = [];

  console.log("clusters", formData.clusters);

  formData.clusters.forEach(function (cluster) {
    console.log("loop", cluster);
    clusterData.push({
      "title": cluster.title,
      "subtitle": cluster.subtitle,
      "text": cluster.text,
      "selected": cluster.selected
    });
  });

  const clusters = formData.clusters;
  console.log("PASSWORD", formData.password)
  const hash = await bcrypt.hash(formData.password, 10)
  console.log(hash)
  const user = new User({
    "firstname": formData.firstname,
    "lastname": formData.lastname,
    "email": formData.email,
    "password": hash,
    "confirmation": hash,
    "resume": formData.resume,
    "linkedin": formData.linkedin,
    "github": formData.github,
    "clusters": [{
      "title": clusters[0].title,
      "subtitle": clusters[0].subtitle,
      "text": clusters[0].text,
      "selected": clusters[0].selected
    },
    {
      "title": clusters[1].title,
      "subtitle": clusters[1].subtitle,
      "text": clusters[1].text,
      "selected": clusters[1].selected
    }, 
    {
      "title": clusters[2].title,
      "subtitle": clusters[2].subtitle,
      "text": clusters[2].text,
      "selected": clusters[2].selected
    }]
  });

  user.save()
  .then((response) => {
    if (!response) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    //jwt payload
    payload = {
      user: {
        email: user.email,
        userId: user._id,
      },
    };
    //jwt signature
    let jwtToken = jwt.sign(payload, "longer-secret-is-better", {
      expiresIn: "1h",
    });
    //Send authorization token
    return res.status(200).json({
      token: jwtToken,
    });
  })

  .catch((error) => {
    res.status(500).json({
      error: error,
    });
    console.log(error);
  });
});


router.route('/clusters/:id').get(async (req, res) => {

  User.findById(req.params.id)
    .then(user => res.json(user.clusters))
    .catch(err => res.status(400). json('Error: ' + err));
})

router.route('/addcluster/:id/:clusterId').post((req, res) => {
  console.log("WORKED")
  User.findById(req.params.id)
    .then(user => {
      user.clusters.push(req.params.clusterId)

      user.save()
        .then(() => res.json('Clusters updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;