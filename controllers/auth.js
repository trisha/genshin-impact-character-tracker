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

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.get('/logout', (req, res) => {
    req.logout() // Passport
    req.flash('success',"You have been successfully logged out.") 
    res.redirect('/')
})

module.exports = router