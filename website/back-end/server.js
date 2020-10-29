const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const clustersRouter = require('./routes/clusters');
const usersRouter = require('./routes/users');
const fileRouter = require('./routes/file-upload');

app.use('/clusters', clustersRouter);
app.use('/users', usersRouter);
app.use('/file', fileRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});