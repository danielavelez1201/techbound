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

  module.exports = router;