const users = require('../../models/user.model');
const mini = require('../../util/functions');
const emails = require('../../util/sendEmail');

// ======================== signup logic ==========================
exports.signup = (req, res) => {
    res.render('admin/sign_up');
};

exports.register = (req, res) => {
    var n = mini.generateOtpCode();
    var date = new Date(-1)
	users.register(new users({username: req.body.name, email: req.body.email, otp: n, otp_exp_date: date }), req.body.password, function(err, user){
		if(err){
            if(err.keyPattern.email){
                req.flash("error", "email is already registered");
                res.redirect("/signup");
            } else {
                req.flash("error", err.message);
                res.redirect("/signup");
            }
        } else {
            req.flash("success", "account is created");
            res.redirect("/login");
        }
    });
};
// ================================================================

// =================== login and logout logic =====================
exports.login = (req, res) => {
    res.render('admin/sign_in');
};

exports.isLoggedIn = (req, res) => {
    if(req.user.blocked){
        req.logout();
        req.flash("error", 'Admin has blocked you Account');
        res.redirect("/login");
    } else {
        req.flash('success', "Welcome!!");
        res.redirect('/dashboard');
    }
}

exports.userLogout = (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
}
// =================================================================

// ============== forgot and reset password logic ==================
exports.forgotPassword = (req, res) => {
    res.render('admin/forgot-password');
}

exports.sendOtp = (req, res) => {
    var n = mini.generateOtpCode();
    var currentDate = new Date();
    var date = new Date(currentDate.setDate(currentDate.getDate() + 1));
    console.log("hello");
    console.log(req.body.email);
    users.findOneAndUpdate({email: req.body.email}, {otp: n, otp_exp_date: date}, function(err, found){
        if(err){
            req.flash("error", err);
            res.redirect("/forgot-password");
        } else if(!found){
            req.flash("error", "Invalid Email. Please check again");
            res.redirect("/forgot-password");
        } else {
            console.log("hello from inside")
            var msg = `${process.env.SECURITY_PORT}://`+(process.env.PORT || "localhost:"+process.env.SERVERPORT)+`/reset-password/${found._id}/${n}`;
            console.log(msg);
            emails.address(process.env.ADMIN_EMAIL, found.email, "Password-Reset", msg,"");
            req.flash("success", "Please check you email box");
            res.redirect("/forgot-password");
        }
    })
}
exports.resetPassword = (req, res) => {
    users.findOne({_id:req.params.id , otp:req.params.token}, function(err, found){
        if(err){
            res.render("admin/404");
        } else if(!found){
            res.render("admin/404");
        } else {
            var currentDate = new Date()
            var futureDate = new Date(found.otp_exp_date);
            if(futureDate > currentDate){
                res.render('admin/send-otp.ejs');
            } else {
                res.render("admin/404");
            }
        }
    });
}

exports.resetPasswordDone = (req, res) => {
    console.log(mini.generateOtpCode());
    var body = {
        otp: mini.generateOtpCode(),
        otp_exp_date: new Date(-1),
    }
    users.findOneAndUpdate({_id:req.params.id , otp:req.params.token},body, function(err, found){
        if(err){
            res.render("admin/404");
        } else if(!found){
            res.render("admin/404");
        } else {
            var currentDate = new Date()
            var futureDate = new Date(found.otp_exp_date);
            if(futureDate > currentDate){
                console.log(found);
                found.setPassword(req.body.password, function(err, user){
                    if(err){
                        req.flash('error', "something went wrong!!!");
                        res.redirect("/login");
                    } else {
                        user.save();
                        req.flash('success', "password reset Successfully.")
                        res.redirect("/login");
                    }
                })
            } else {
                res.render("admin/404");
            }
        }
    });
}
// =================================================================