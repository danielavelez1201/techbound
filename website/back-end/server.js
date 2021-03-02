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

/*
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
*/

//app.use(passport.initialize());
//app.use(passport.session());

//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

const clustersRouter = require("./routes/clusters");
const usersRouter = require("./routes/users");
const signS3Router = require("./routes/s3");
//const fileRouter = require('./routes/file-upload');
//const scanRouter = require('./routes/file-scan');
const auth = require("./routes/auth");
const internshipRouter = require("./routes/internships");
const emailRouter = require("./routes/email");

app.use("/sign-s3", signS3Router);
app.use("/clusters", clustersRouter);
app.use("/users", usersRouter);
app.use('/auth', auth);
app.use('/internships', internshipRouter);
app.use("/email", emailRouter);
//app.use('/file', fileRouter);
//app.use('/scan', scanRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  const { firstname, lastname, email, password, confirmation } = req.body;
  if (!email) {
    res.status(400).json({ error: "must provide email" });
  } else if (!password) {
    res.status(400).json({ error: "must provide password" });
  } else if (password !== confirmation) {
    res.status(400).json({ error: "password must match confirmation" });
  } else {
    User.register(
      new User({ email: email, firstname: firstname, lastname: lastname }),
      password,
      (err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        passport.authenticate("local")(req, res, () => {
          req.session.userId = this.lastID;
          res.status(200).json({});
        });
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
