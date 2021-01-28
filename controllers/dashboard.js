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
        include: [db.goal],
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        myCharacters.forEach((myChar, index) => {
            // Grab all the goals for each mycharacter.
            db.goal.findAll({
                where: {
                    myCharacterId: myChar.id
                },
                include: [db.myCharacter]
            }).then(foundGoals => {
                console.log('🐯 foundGoals: ', foundGoals, 'typeof foundGoals', typeof foundGoals, '🐯🐯')
                // myChar.goals = foundGoals // We add this to our JavaScript object but don't save it to our SQL database.
                // goal.charId = myChar.id
                // goal.goals = foundGoals // I think this is an array.
                
            })
            // console.log('🐴 myChar.goals: ', myChar.goals, '🐴🐴')
        }) // Where the .forEach ends.
        console.log('🦄 myCharacters: ', myCharacters, '🦄🦄')
        res.render('dashboard/dashboardView.ejs', {myCharacters: myCharacters})
    }) // Where the .then ends 
    // Outside of my character.findAll
})

// 'Add a new goal' page.
router.get('/goal/add', isLoggedIn, (req, res) => {
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        include: [db.goal],
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        res.render('dashboard/newGoal.ejs', {myCharacters: myCharacters})
    })
})

// Select a character and add a new goal to it. 
router.post('/goal/add', (req, res) => {
    // console.log('🐣 character: ', req.body.myCharId)
    // console.log('🐣 goal: ', req.body.goal)
    db.goal.create({
        myCharacterId: req.body.myCharId,
        li: req.body.goal // li as in List Item.
    }).then(goal => {
        db.myCharacter.findOne({where: {id: req.body.myCharId}})
        .then(foundChar => {
            foundChar.addGoal(goal)
            // Do I need to update the goalId column in myCharacter? 
        })
    }).catch(err => { console.log(err) }) // If there's an error creating a goal.
    res.redirect('/dashboard') 
})

// Delete a specified goal. 
router.post('/goal/delete')

module.exports = router