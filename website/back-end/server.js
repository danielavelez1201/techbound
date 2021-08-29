import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { usersRouter } from './routes/users.js';
import { emailRouter } from './routes/email.js';
import { signupRouter } from './routes/signup.js';

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


app.use("/users", usersRouter);
app.use("/signup", signupRouter);
app.use("/email", emailRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

