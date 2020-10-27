const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clusterSchema = new Schema({
    title: String
});

const Cluster = mongoose.model('Cluster', clusterSchema);
module.exports = Cluster;
