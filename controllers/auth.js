const express = require('express')
const router = express.Router()
// const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    res.send("Auth page")
})

router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

router.post('/signup', (req, res) => {
    res.redirect('/auth/signup')
})

router.get('/logout', (req, res) => {
    res.render('auth/logout.ejs')
})

module.exports = router