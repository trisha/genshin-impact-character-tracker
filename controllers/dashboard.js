const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.
const isLoggedIn = require('../middleware/isLoggedIn.js')


router.get('/', isLoggedIn, (req, res) => {
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        res.render('dashboard/dashboardView.ejs', {myCharacters: myCharacters})
    })
})

router.post('/newgoal', (req, res) => {
    // console.log(req.body.character, req.body.goal)
    console.log("We've hit our POST route!")
    res.redirect('/dashboard')
})

module.exports = router