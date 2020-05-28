const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http');
const multer = require('multer');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const socket = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

const config = require('./database/config');

// user package in app
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookie: { maxAge: 80000},
    secret: "vishal",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

require('./router/backend.routes.js')(app, passport, multer);

mongoose.connect(config.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
});


mongoose.Promise = global.Promise;

// server start

server.listen(process.env.PORT || config.server_port, () => {
    console.log("Server is Listening on port " + 4000);
})