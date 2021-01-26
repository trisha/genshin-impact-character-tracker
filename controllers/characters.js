const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    // let backName = req.user.name + ' Pan' (instead of res.locals.currentUser.name)
    res.render('characters/myCharacters.ejs')
})

router.get('/all', (req, res) => {
    res.render('characters/allCharacters.ejs')
})

router.get('/partial', (req, res) => {
    res.render('partials/view.ejs')
})

router.post('/new', (req, res) => {
    let characters = req.body.characters
    console.log('🐹Selected characters: ', characters)
    res.redirect('/characters')
})

module.exports = router