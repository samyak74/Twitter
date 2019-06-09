var mongoose = require('mongoose');

//Establishing connection to MongoDB server
mongoose.connect('mongodb://127.0.0.1/Twitter');

module.exports = mongoose;