
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

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