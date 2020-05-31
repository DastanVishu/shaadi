
module.exports = (app, passport) => {
const  login = require('../controller/admin/login');
const middleware = require('../middleware/middleware');
const dashboard = require('../controller/admin/dashboard');
app.get('/', login.home);

// ======================== login and signup ======================
app.get('/signup', login.signup);
app.post('/signup', login.register);
app.get('/login', login.login);
app.post('/login',passport.authenticate("local", {
    failureFlash: 'Invalid username or password.',
    failureRedirect: "/login"
}), login.isLoggedIn);
app.get('/logout', login.userLogout);
//=================================================================

//=============== forgot and reset password logic =================
app.get('/forgot-password', login.forgotPassword);
app.post('/forgot-password', login.sendOtp);
app.get('/reset-password/:id/:token', login.resetPassword);
app.post('/reset-password/:id/:token', login.resetPasswordDone);
//=================================================================




//======================== admin dashboard ========================
app.get('/dashboard', dashboard.dashboard);
//=================================================================

}