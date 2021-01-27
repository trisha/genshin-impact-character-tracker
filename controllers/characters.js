const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.
const isLoggedIn = require('../middleware/isLoggedIn.js')

router.get('/', isLoggedIn, (req, res) => {
    // let backName = req.user.name + ' Pan' (instead of res.locals.currentUser.name)
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['name', 'ASC']
        ]
    }).then(myCharacters => {
        res.render('characters/myCharacters.ejs', {myCharacters: myCharacters})
    })
})

router.get('/all', (req, res) => {
    res.render('characters/allCharacters.ejs')
})

router.get('/partial', (req, res) => {
    res.render('partials/view.ejs')
})

router.post('/new', (req, res) => {
    let characters = req.body.characters
    characters.forEach(character => { 
        db.myCharacter.findOrCreate({
            where: {
                userId: req.user.id,
                name: character 
            }
        })
        .then(([myNewChar, wasCreated]) => { // Returns char object and boolean true or false.
            db.stockCharacter.findOne({
                where: {
                    name: myNewChar.name
                }
            })
            .then(stockChar => {
                myNewChar.vision = stockChar.vision
                stockChar.addMyCharacter(myNewChar)
            })
        })
    }) 
    res.redirect('/characters')
})

router.delete('/delete/:idx', (req, res) => {
    db.myCharacter.destroy({
        where: {
            userId: req.user.id,
            id: req.params.idx
        }
    }).then(rowsDeleted => {
        res.redirect('/characters')
    })
})

module.exports = router