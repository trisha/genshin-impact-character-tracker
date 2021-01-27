const axios = require('axios')
const express = require('express')
const app = express()
const db = require('./models')

require('dotenv').config()
const apiKey = process.env.API_KEY

let charsEndpoint = 'https://api.genshin.dev/characters'

axios.get(charsEndpoint)
.then(response => {
    // response.data returns array of current characters, where each element is a string.
    response.data.forEach(async character => { // Call API for ea char. 
        charEndpoint = `${charsEndpoint}/${character}`
        await axios.get(charEndpoint) // Returns info on ea char.
        .then(response => {
            
            db.stockCharacter.findOrCreate({
                where: {
                    name: response.data.name, // Using .name because it's capitalized, but character isn't.
                },
                defaults: {
                    description: response.data.description, 
                    rarity: response.data.rarity,
                    vision: response.data.vision,
                    weapon: response.data.weapon                 
                }
            }).then(([char, wasCreated]) => { // Returns char object and boolean true or false.
                console.log(`🙈Character: ${char.name} \n wasCreated: ${wasCreated}`)
                process.exit()
            }) 

        })
    })
})

// Name of stockCharacter table
