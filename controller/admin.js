const users = require('../models/user.model');

exports.home = (req, res) => {
    console.log(res.locals.currentUser);
};

exports.login = (req, res) => {
    res.render('admin/sign_in');
};

// exports.isLoggedIn = (req, res) => {
//     req.flash("error", 'Invalid username or password.');
//     res.redirect("/login");
// }

exports.userLogout = (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
}

exports.signup = (req, res) => {
    res.render('admin/sign_up');
};

exports.register = (req, res) => {
	users.register(new users({username: req.body.name, email: req.body.email }), req.body.password, function(err, user){
		if(err){
            req.flash("error", err.message);
			res.redirect("/signup");
        } else {
            req.flash("success", "account is created");
            res.redirect("/signup");
        }
    });

};