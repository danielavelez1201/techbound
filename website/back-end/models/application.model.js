const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const clusterSchema = new Schema(
  {title: String, 
  subtitle: String, 
text: String, 
selected: Boolean}
)
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmation: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    clusters: {
      type: [String],
      required: true,
    }
  },
  {
    timestamps: true, //created, modified
  }
);

userSchema.plugin(uniqueValidator, {message: 'Email already exists!'});

const User = mongoose.model("User", userSchema);
module.exports = User;