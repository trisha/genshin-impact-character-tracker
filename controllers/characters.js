const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    // let backName = req.user.name + ' Pan'
    res.render('characters/myCharacters.ejs')
})

router.put('/new', (req, res) => {
    console.log(`🐻 ${req.body.value}`)
    console.log(`🐻 ${req.body.character}`)
    res.redirect('/characters')
})

module.exports = router