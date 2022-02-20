let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



var passport = require("passport");

// connect to contact Model
//let Contact = require('../models/contact');

//var User = require("../models/user");
//let auth = require("../config/app");
//let appjs = require('../config/app');

//const isLogged = require('../controllers/auth');

//let isLogged = require('../helper/authHelper'); 
//const myModule = require('../config/app') ;

let contactController = require('../controllers/contact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



/* GET Route for the Contact List page - READ Operation */
//const isLoggedIn = myModule.isLoggedIn;
router.get('/', requireAuth,  contactController.displayContactList);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth,  contactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth,  contactController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

/*
function isLoggedIn(req, res, next){
    if(req.isAuthenticated){
        return next();
    }
    res.redirect("/login");
  }
*/




module.exports = router;