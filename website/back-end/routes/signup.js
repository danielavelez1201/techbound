require('dotenv/config')

const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const router = require("express").Router();


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage });

router.route('/').post(upload.any('file'), async (req, res) => {
    console.log(req)

    
    let myFile = req.body.resume.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: "techbound-resumes",
        Key: `${uuid()}.${fileType}`,
        Body: req.body.resume.buffer,
    }

    s3.upload(params, (error, data));

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

    
})

module.exports = router;
