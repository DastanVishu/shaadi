var mongoose = require('mongoose');
var passportLocalMongoose	= require("passport-local-mongoose");


var userSchema = mongoose.Schema({
    username: String,
    password: String,
    profile_pic: String,
    email: String,
    id_address: String
}, {
    timestamps: true
});

//methods ======================
    userSchema.plugin(passportLocalMongoose);

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);
