const router = require('express').Router();
var spawn = require("child_process").spawn;

console.log("in file scan route")


router.route('/').get((req, res) => {
    var process = spawn('python', ["../file-scan.py", req.query.firstname, req.query.lastname]);
    console.log("NAME")
    console.log(req.query.firstname)
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    })
  });


var fileUpload = require('express-fileupload');
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router;