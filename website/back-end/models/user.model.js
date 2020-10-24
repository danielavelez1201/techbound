const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    firstName: String, 
    lastName: String, 
    type: String
}, {
    timestamps: true, //created, modified
});

const User = mongoose.model('User', userSchema);
module.exports = User;
