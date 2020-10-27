const router = require('express').Router();
let Cluster = require('../models/cluster.model');

router.route('/').get((req, res) => {
  Cluster.find()
    .then(clusters => res.json(clusters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;

  const newCluster = new Cluster({title});

  newCluster.save()
    .then(() => res.json('Cluster added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;