const axios = require('axios')
const express = require('express')
const app = express()
const db = require('./models')

require('dotenv').config()
const apiKey = process.env.API_KEY

let charsEndpoint = 'https://api.genshin.dev/characters'

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const getOneCharData = (charName) => {
    return axios.get(`https://api.genshin.dev/characters/${charName}`)
    .then(response=>{
        return response.data
    })
}

const insertChar = async (char) => {
    let charData = await getOneCharData(char)
    db.testStockCharacter.findOrCreate({
        where: {name: charData.name},
        defaults: {
            description: charData.description, 
            rarity: charData.rarity,
            vision: charData.vision,
            weapon: charData.weapon                 
        }
    }).then(([stockChar, wasCreated]) => {
        console.log(`${stockChar.name} has been added to the DB`)
    })
}

const bulkInsertChar = async (chars) => {
    await asyncForEach(chars, async (char) =>{
        await insertChar(char)
    })
}

axios.get(charsEndpoint)
.then(chars => {
    bulkInsertChar(chars.data)
})