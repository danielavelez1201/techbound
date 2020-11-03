const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        minlength: 3
    },
    firstName: String, 
    lastName: String, 
    type: String,
    clusters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cluster'}]
}, {
    timestamps: true, //created, modified
});

const User = mongoose.model('User', userSchema);
module.exports = User;
