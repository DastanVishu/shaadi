
module.exports = (app, passport) => {
const  admin = require('../controller/admin');

app.get('/', admin.home);

// ======================== login and signup ======================
app.get('/login', admin.login);
app.post('/login',passport.authenticate("local", {
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!',
    successRedirect: "/",
    failureRedirect: "/login"
}));
app.get('/logout', admin.userLogout);
app.get('/signup', admin.signup);
app.post('/signup', admin.register);
//=================================================================

}