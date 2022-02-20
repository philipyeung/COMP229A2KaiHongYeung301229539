let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User;

// create a reference to the model
let Contact = require('../models/contact');

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutMePage = (req, res, next) => {
    res.render('aboutme', { title: 'About Me'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects'});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services'});
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('contactme', { title: 'Contact Me', body: '', response:''});
}

//module.exports.displayAddPage = (req, res, next) => {
//    res.render('contactme', {title: 'Add Contact'})          
//}

module.exports.processContactMePage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.firstName +" "+ req.body.lastName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress,    
        "message": req.body.message
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(Contact);

            // refresh the contact list
            //res.redirect('/contact-list');
            res.render('contactme', {title:'', body: '', response: "Thanks for your contacting. I'll get back to you soon."})
            //res.redirect('/contactme');
        }
    });

}

/*
module.exports.displayContactMessageAddPage = (req, res, next) => {
    res.render('contactMessage', {title: 'Add Message'})          
}

module.exports.processContactMessageAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.firstName  +" "+ req.body.lastName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress,    
        "message": req.body.message
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list

            //res.redirect('/contact-list');

            //res.render('contactme.ejs', {title:'', body: '', response: "Thanks for your contacting. I'll get back to you soon."})
            //res.redirect('contactme.ejs');
            res.render('contactme', {title:'', body: '', response: "Thanks for your contacting. I'll get back to you soon."})
            res.redirect('/contact-list');
        }
    });

}
*/



module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/contact-list');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});
            */

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

            /* TODO - Getting Ready to convert to API
            res.json({success: true, msg: 'User Registered Successfully!'});
            */

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
