const router = require('express').Router();
const Internship = require("../models/internship.model");


router.route("/").get((req, res) => {
    console.log("inside router!!");
    Internship.find()
    .then(foundInternships => res.json(foundInternships))
})

module.exports = router;