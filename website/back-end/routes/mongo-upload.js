const router = require("express").Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
var mongoose = require('mongoose');
var crypto = require('crypto');

var MongoClient = require('mongodb').MongoClient;
//var uri = "mongodb://dvelez:1234@techbound-resumes-8tkwb.a.query.mongodb.net/dev?ssl=true&authSource=admin";
var uri = "mongodb+srv://dvelez:1234@dev.8tkwb.mongodb.net/dev?retryWrites=true&w=majority"

const connect = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Init gfs
let gfs;

connect.once('open', () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads"
  });
});

// Create storage engine
/* const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.exWtname(file.originalname);
        console.log(filename)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
}); */

const storage = new GridFsStorage({ url: uri});

const upload = multer({ storage });

router.route('/').post(upload.single("avatar"), (req, res) => {
  if (req.file) { 
    return res.end()};
  res.end('Missing file');
  
  console.log("uploaded on mongo!");
}) 


/* router.route('/').post((req, res) => {

    MongoClient.connect(uri, function(err, client) {
        console.log("connected to mongo");
        const collection = client.db("techbound-resumes").collection("techbound-resumes");
        collection.aggregate()
        client.close();
      });
    
   return res.status(200).send(req.file)
 }); */




module.exports = router;
