//*******************************************************************
//  COMP229   Personal Portfolio Website
//  File name       : app.js
//  Student’s Name  : Kai Hong Yeung
//  StudentID       : 301229539
//  Date            : 2 Feb 2022
//*******************************************************************

let express = require('express');
let router = express.Router();


var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

let indexController = require('../controllers/index');

const User = require('../models/user');

/* GET home page. */
router.get('/', indexController.displayHomePage);
/*
router.get('/', function(req, res, next) {
  res.render('index', 
  { title: 'Home' ,
  mainHeading: "Main Heading"
});
});
*/


/*This Express site must include the pages from your Personal Portfolio 5 pages – your 
Home page, an About Me page, a Projects page, a Services page, and a Contact Me page.*/

/* GET home page. */
router.get('/home', indexController.displayHomePage);
/*router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});*/

/* GET About Me page. */
router.get('/aboutme', indexController.displayAboutMePage);
/*router.get('/aboutme', function(req, res, next) {
  res.render('aboutme', { title: 'About Me'});
});*/

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);
/*router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});*/

/* GET Services page. */
router.get('/services' , indexController.displayServicesPage);
/*router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services'});
});*/

/* GET Contact Me page. */
router.get('/contactme', indexController.displayContactMePage);
/*router.get('/contactme', function(req, res, next) {
  res.render('contactme', { title: 'Contact Me', body: '', response:''});
});*/

/* POST Contact Me page. */
router.post('/contactme', indexController.processContactMePage);




/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);





//router.get('/contactMessage', indexController.displayContactMessageAddPage);

//router.post('/contactMessage', indexController.processContactMessageAddPage);


/* GET Login page. */
//router.get('/login', indexController.displayLoginPage);



//passport.use(new LocalStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================
// Showing home page
/*
router.get("/", function (req, res) {
res.render('register', {
title: 'Registration Page',
name: '',
email: '',
password: ''    
})
});
// Showing secret page
router.get("/home", isLoggedIn, function (req, res) {
res.render("home");
});
*/
/*
// Showing register form
router.get("/register", function (req, res) {
  res.render('register', {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''
  })
});
// Handling user signup
router.post("/register", function (req, res) {
  var email = req.body.email
  var password = req.body.password
  User.register(new User({ email: email }),
    password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(
        req, res, function () {
          req.flash('success', 'You have logged in')
          res.render("home");
        });
    });
});
*/
/*
//Showing login form
router.get("/login", function (req, res) {
  res.render('login', {
    title: 'Login',
    email: '',
    password: ''
  })
});
//Handling user login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login"
}), function (req, res) {
});
*/
/*
//Handling user logout
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});
*/
/*
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
*/

module.exports = router;


