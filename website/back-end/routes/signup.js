require('dotenv/config')
const bcrypt = require('bcrypt');
const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const router = require("express").Router();
let User = require('../models/user.model');
const jwt = require("jsonwebtoken");


router.route('/').post(async (req, res) => {
    const data = req.body;
    console.log(data);

    const formData = req.body;

    console.log("PASSWORD", formData.password)
    const hash = await bcrypt.hash(formData.password, 10)
    console.log(hash)
    const user = new User({
      "firstname": formData.firstname,
      "lastname": formData.lastname,
      "email": formData.email,
      "password": hash,
      "confirmation": hash,
      "linkedin": formData.linkedin,
      "github": formData.github,
      "clusters": [formData.cluster1, formData.cluster2, formData.cluster3]});
  
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

    
})

module.exports = router;
