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
router.post('/goal/add', isLoggedIn, (req, res) => {
    // console.log('🐣 character: ', req.body.myCharId)
    // console.log('🐣 goal: ', req.body.goal)
    db.goal.create({
        myCharacterId: req.body.myCharId,
        li: req.body.goal // li as in List Item.
        // userId: req.user.id
    }).then(goal => {
        db.myCharacter.findOne({where: {id: req.body.myCharId}})
        .then(foundChar => {
            foundChar.addGoal(goal)
            // Do I need to update the goalId column in myCharacter? 
        })
    }).catch(err => { console.log(err) }) // If there's an error creating a goal.
    res.redirect('/dashboard') 
})

router.get('/goaledit', isLoggedIn, (req, res) => {
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        include: [db.goal],
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        res.render('dashboard/editGoal.ejs', {myCharacters: myCharacters})
    })
})

// Delete specified goal(s). 
// How to get value of checkboxes: https://stackoverflow.com/questions/48398600/how-to-get-value-of-checkbox-in-express
router.delete('/goal/delete', isLoggedIn, (req, res) => {
    // req.body.goalId returns array of strings. If single entry, then returns just a string.
    let goalIds = req.body.goalId
    if (typeof goalIds == 'string') { goalIds = [goalIds] }
    goalIds.forEach(goalId => {
        db.goal.destroy({
            where: {
                // userId: req.user.id,
                id: goalId
            }
        }).then(rowsDeleted => {
        })
    })
    res.redirect('/dashboard/goaledit')
})

module.exports = router


/*

// Edit each dino. 
router.get('/edit/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = req.params.idx
    let myDino = dinoData[dinoIndex]
    res.render('dinosaurs/edit.ejs', {
        myDino: myDino,
        myIndex: dinoIndex})
})

router.put('/:idx', (req, res) => {
    let dinosaurs = fs.readFileSync('dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.body)
    dinoData[req.params.idx] = req.body
    // dinoData[req.params.idx].name = req.body.name
    // dinoData[req.params.idx].type = req.body.type
    
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})


<form action="/dinosaurs/<%= myIndex %>/?_method=PUT" method="POST">
    <label for="dinosaurName">Name</label>
    <input type="text" id="dinosaurName" value="<%= myDino.name %>" name="name">

    <label for="dinosaurType">Type</label>
    <input type="text" id="dinosaurType" name="type" value="<%= myDino.type %>">

    <input type="submit" value="Update Dino">
</label>
</form>

*/

