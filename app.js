const express = require("express");
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require("./config/passportSetup");
const mongoose = require('mongoose');
const keys = require('./config/keys')
const session = require('express-session');
const passport = require('passport');

const app = express();



//set view engine
app.set('view engine', 'ejs');

app.use(session({
    secret: keys.session.cookieKey, // Secret key for signing the session ID cookie
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Forces a session that is uninitialized to be saved to the store
    cookie: { secure: false } // Set to true if using HTTPS (for production)
}));

app.use(passport.initialize());
app.use(passport.session());

const connection = mongoose.connection

mongoose.connect(keys.mongodb.dbURL);

connection.on('connected', () => {
    console.log('mongodb connection successful')
});

connection.on('error', (error) => {
    console.log('mongodb connection failed')
});

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

//create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("node server started using nodemon");
});