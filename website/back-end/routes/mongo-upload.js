// const router = require("express").Router();
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://dvelez:1234@techbound-resumes-8tkwb.a.query.mongodb.net/dev?ssl=true&authSource=admin";

// const conn = mongoose.createConnection(mongoURI);

// // Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });
// const upload = multer({ storage });

// router.route('/').post((req, res) => {

//     MongoClient.connect(uri, function(err, client) {
//         console.log("connected to mongo");
//         const collection = client.db("techbound-resumes").collection("techbound-resumes");
//         collection.aggregate()
//         client.close();
//       });

    
    
//    return res.status(200).send(req.file)
//  });




// module.exports = router;
