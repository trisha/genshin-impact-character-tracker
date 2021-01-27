const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    // let backName = req.user.name + ' Pan' (instead of res.locals.currentUser.name)
    db.myCharacter.findAll({
        where: {
            userId: req.user.id
        }
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
    console.log('🐹Selected characters: ', characters)
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
                stockChar.addMyCharacter(myNewChar)
                console.log(`🙈Character: ${myNewChar.name} \n wasCreated: ${wasCreated}`)
            })
        })
        res.redirect('/characters')
    }) 
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