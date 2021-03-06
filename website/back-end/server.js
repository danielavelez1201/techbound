const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
//const passportLocalMongoose = require("passport-local-mongoose");
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })
//const User = require("models/user.model");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const uri = "mongodb+srv://dvelez:1234@dev.8tkwb.mongodb.net/dev?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const clustersRouter = require("./routes/clusters");
const usersRouter = require("./routes/users");
const signS3Router = require("./routes/s3");
//const fileRouter = require('./routes/file-upload');
//const scanRouter = require('./routes/file-scan');
const auth = require("./routes/auth");
const internshipRouter = require("./routes/internships");
const emailRouter = require("./routes/email");
const mongoAWSRouter = require("./routes/mongo-upload");

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use("/sign-s3", signS3Router);
app.use("/clusters", clustersRouter);
app.use("/users", usersRouter);
app.use('/auth', auth);
app.use('/internships', internshipRouter);
app.use("/email", emailRouter);
app.use('/upload-file', mongoAWSRouter);

//app.use('/file', fileRouter);
//app.use('/scan', scanRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
