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

        db.stockCharacter.findAll({
        }).then(stockCharacters => {
            res.render('characters/myCharacters.ejs', {myCharacters: myCharacters, stockCharacters: stockCharacters})
        })
        
    })
})

// Find all stockCharacters for the All Characters page.
router.get('/all', (req, res) => {
    db.stockCharacter.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then(stockCharacters => {
        res.render('characters/allCharacters.ejs', {stockCharacters: stockCharacters})
    })
})

// Add new character/s.
router.post('/new', (req, res) => {
    let characters = req.body.characters
    if (typeof characters == 'string') { characters = [characters] } // Convert string to array so we can forEach on it.
    characters.forEach(async character => { 
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
            .then(async stockChar => {
                myNewChar.vision = stockChar.vision
                myNewChar.rarity = stockChar.rarity
                await stockChar.addMyCharacter(myNewChar)
                await myNewChar.save()
            })
        })
    })
    // This is happening too soon; only some of my characters show up and then I have to refresh for all to show up.
    function redirect() { res.redirect('/characters') }
    setTimeout(redirect, 100)
})

router.delete('/delete/:idx', (req, res) => {
    db.myCharacter.destroy({
        where: {
            userId: req.user.id,
            id: req.params.idx
        }
    }).then(rowsDeleted => {
        // Delete comments based on myCharacterId only AFTER verifying ownership of myChar.
        db.goal.destroy({
            where: {
                myCharacterId: req.params.idx
            }
        }).then(rowsDeleted => {
            res.redirect('/characters')
        })
    })
})

// API is down....
// const axios = require('axios')
// router.get('/view/:name', (req, res) => {
//     db.stockCharacter.findOne({
//         where: {
//             name: req.params.name
//         }
//     }).then(character => {
//         let endpoint = `https://api.genshin.dev/characters/${character.name}`
//         axios.get(endpoint) // Returns info on ea char.
//     .then(response => {
//         let talents = response.data.skillTalents
//         res.render('characters/characterDetail.ejs', {char: character, talents: talents})    
//     })    
//     })
// })


const axios = require('axios')
router.get('/view/:name', (req, res) => {
    db.stockCharacter.findOne({
        where: {
            name: req.params.name
        }
    }).then(character => {
        res.render('characters/characterDetail.ejs', {char: character})    
    })
})

module.exports = router

// API is down.... Below code was .ejs for characterDetail.ejs
/* <p style="max-width: 500px;">
                <h5 class="<%= char.vision %>">Talents:</h5>
            <ul><% talents.forEach(talent => { %>
                <li><%= talent.name %></li>
            <% }) %></ul>
            </p> */