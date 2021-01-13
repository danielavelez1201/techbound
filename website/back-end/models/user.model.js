const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const clusterSchema = new Schema(
  {title: String, 
  subtitle: String, 
text: String, 
selected: Boolean}
)
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    confirmation: String,
    resume: String,
    linkedin: String,
    github: String,
    clusters: [clusterSchema],
  },
  {
    timestamps: true, //created, modified
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
