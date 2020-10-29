const multer = require('multer')

const router = require('express').Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')


router.route('/upload').post((req, res) => {
    console.log("file");
    console.log(req);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    
   return res.status(200).send(req.file)
 })

});

module.exports = router;

