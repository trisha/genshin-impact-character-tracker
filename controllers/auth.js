const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    res.send("Auth page")
})

router.post('/signup', (req, res) => {
    // Find or create a new user!
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })
    .then( ([user, wasCreated]) => {
        if(wasCreated) {
            passport.authenticate('local', {
                successRedirect: '/dashboard',
                successFlash: "Account created and user logged in!"
            })(req, res) // IIFE, immediately invoked function expression. 'passport.authenticate' is a function that's being called because of its open parentheses next to it, and it returns a function definition in order for it to act as a callback function.
        } else {
            req.flash('error', "An account associated with that email address already exists! Did you mean to log in?")
            res.redirect('/auth/login')
        }   
    })
    .catch(err => {
        req.flash('error', err.message)
        res.redirect('/auth/signup')
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

// router.post with a res.redirect gets replaced by passport.
router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/auth/login',
    successRedirect: '/dashboard',
    successFlash: "You have been successfully logged in.",
    failureFlash: "Invalid email or password."
})) 

// Replaced above code with code from Yasaman so I can return different error messages dependent on the situation.
// Couldn't get code from Yasaman to work because I don't have a req.
// router.post('/login', (res, req) => {
//     passport.authenticate('local', function(err, user, info) {
//         if (err == "noEmail") {
//             req.flash('error', 'Email not found, please try again (emails are NOT case sensitive) or create a new account!')
//             return res.redirect('/auth/signup')
//         } else if (err == "noMatch") {
//             req.flash('error', "Email and password combination not a match.")
//             return res.redirect('/auth/login')
//         } else {
//             req.logIn(user, function(err) {
//                 if (err) { return next(err) }
//                 return res.redirect('/dashboard')
//             })
//         }
//     }
// )})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.get('/logout', (req, res) => {
    req.logout() // Passport
    req.flash('success',"You have been successfully logged out.") 
    res.redirect('/')
})

module.exports = router