const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.
const isLoggedIn = require('../middleware/isLoggedIn.js')

// Show all character goals on dashboard.
router.get('/', isLoggedIn, (req, res) => {
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        myCharacters.forEach((myChar, index) => {
            // Grab all the goals as well.
            let goals = []
            db.goal.findAll({
                where: {
                    myCharacterId: myChar.id
                }
            }).then(foundGoals => {
                myChar.goals = foundGoals // We add this to our JavaScript object but don't save it to our SQL database.
            })
        })
        res.render('dashboard/dashboardView.ejs', {myCharacters: myCharacters})
    })
})

// Select a character and add a new goal. 
router.post('/newgoal', (req, res) => {
    // console.log('🐣 character: ', req.body.myCharId)
    // console.log('🐣 goal: ', req.body.goal)
    db.goal.create({
        myCharacterId: req.body.myCharId,
        li: req.body.goal // li as in List Item.
    }).then(goal => {
        db.myCharacter.findOne({where: {id: req.body.myCharId}})
        .then(foundChar => {
            foundChar.addGoal(goal)
        })
    }).catch(err => { console.log(err) }) // If there's an error creating a goal.
    res.redirect('/dashboard') 
})

module.exports = router