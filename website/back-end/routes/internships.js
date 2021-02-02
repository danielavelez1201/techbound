const router = require('express').Router();
const Internship = require("../models/internship.model");


router.route("/").get((req, res) => {

    
    console.log("inside router!!");
    Internship.find()
    .then(foundInternships => res.json(foundInternships))
})

router.route("/:clusterName").get((req, res) => {
    console.log("organizing internships");

})

module.exports = router;