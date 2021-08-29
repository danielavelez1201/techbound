const express = require("express");
const cors = require("cors");
var mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

const usersRouter = require("./routes/users");
const auth = require("./routes/auth");
const emailRouter = require("./routes/email");
const signupRouter = require("./routes/signup");

app.use("/users", usersRouter);
app.use("/signup", signupRouter);
app.use('/auth', auth);
app.use("/email", emailRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

