const axios = require('axios')
const express = require('express')
const app = express()
const db = require('./models')

require('dotenv').config()
const apiKey = process.env.API_KEY

let charsEndpoint = 'https://api.genshin.dev/characters'

// Added a delay between each forEach iteration. Source code: https://travishorn.com/delaying-foreach-iterations-2ebd4b29ad30
const grabCharDetailsAndCreate = (character) => {
    charEndpoint = `https://api.genshin.dev/characters/${character}`
    axios.get(charEndpoint) // Returns info on ea char.
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
        })  
    })
}

const delayLoop = (fn, delay) => {
    return (charName, i) => {
        setTimeout(() => {
        grabCharDetailsAndCreate(charName)
      }, i * delay)
    }
}

axios.get(charsEndpoint)
.then(response => { 
    // response.data returns array of current characters, where each element is a string.
    response.data.forEach(delayLoop(grabCharDetailsAndCreate, 100))
})

////////////////////////////////////////////////////////////
// Example of how to use Promise.all in general.
/*
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
});
// expected output: Array [3, 42, "foo"]
*/
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// Below code works, but characters aren't added alphabetically.
// Using Promise.all to iterate through each character and run an API call for each character.
/*
axios.get(charsEndpoint)
.then(response => {
    // response.data returns array of current characters, where each element is a string.
    Promise.all(response.data.map(character => { // Call API for ea char. 
        charEndpoint = `${charsEndpoint}/${character}`
        axios.get(charEndpoint) // Returns info on ea char.
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
            })
            .then( ([char, wasCreated]) => { // Returns char object and boolean true or false.
                console.log(`🙈Character: ${char.name} \n wasCreated: ${wasCreated}`)
                        })
        })
    }) )
})
*/


////////////////////////////////////////////////////////////////////////////////////////////
// Below uses an async forEach. Code is also in the server_api_async.js file.
// Inspired by this article: https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
/* 
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
*/



////////////////////////////////////////////////////////////////////////////////////////////
// Below code wasn't working, there are 30 characters but only 29 ended up in the SQL table even after running the below twice. Same issue when removing async and await.
/*
axios.get(charsEndpoint)
.then(response => {
    console.log(response.data.length)
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
            }) 
        })
    })
})
*/