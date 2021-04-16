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

router.route('/').post(upload.any('file'), (req, res) => {
    console.log(req)
    let myFile = req.files[0].originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: "techbound-resumes",
        Key: `${uuid()}.${fileType}`,
        Body: req.files[0].buffer,
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})

module.exports = router;
