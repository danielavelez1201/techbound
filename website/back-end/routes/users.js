
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => {

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

  bcrypt.hash(formData.password, 10).then((hash) => {
    const newUser = new User({
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
  })

  console.log("NEW USER", newUser);
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
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