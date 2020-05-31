var mongoose = require('mongoose');
var passportLocalMongoose	= require("passport-local-mongoose");


var userSchema = mongoose.Schema({
    username: { type: String, unique: true, required:true },
    password: String,
    profile_pic: String,
    email: { type: String, unique:true },
    blocked: { type: Boolean, default: false },
    user_role: { type: Number, default: 2 },
    ip_address: String,
    otp: String,
    otp_exp_date: String
}, {
    timestamps: true
});

//methods ======================
    userSchema.plugin(passportLocalMongoose);

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);
