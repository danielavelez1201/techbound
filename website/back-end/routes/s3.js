const router = require("express").Router();
var aws = require("aws-sdk");
aws.config.update({ region: "us-west-2" });

var s3 = new aws.S3({ apiVersion: "2006-03-01" });

const signS3 = (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: "techbound",
    Key: fileName,
    ContentType: fileType,
  };
  console.log("IN SIGNS3");
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log("error", err);
      res.status(422).end();
    }

    const returnData = {
      signedRequest: data,
      url: `https://techbound.s3.amazonaws.com/${fileName}`,
    };
    return res.send(JSON.stringify(returnData));
  });
};

router.route("/").get(signS3);

module.exports = router;
