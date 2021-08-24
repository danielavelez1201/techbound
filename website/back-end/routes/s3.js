const router = require("express").Router();
var aws = require("aws-sdk");
aws.config.update({ region: "us-west-2" });

var s3 = new aws.S3({ apiVersion: "2006-03-01" });

router.route('/').post((req, res) => {
  const s3 = new aws.S3();
  console.log(req);
  const fileName = req.file.name;
  const fileType = req.file.type;
  console.log(fileName)
  const s3Params = {
    Bucket: "techbound-resumes",
    Key: fileName,
    ContentType: fileType,
  };  

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
}) 


module.exports = router;
