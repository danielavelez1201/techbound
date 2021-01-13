const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const internshipSchema = new Schema({
    "last-updated": Date,
    notes: String, 
    name: String, 
    link: String, 
    location: String,
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;
