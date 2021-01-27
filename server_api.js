const axios = require('axios')
const express = require('express')
const app = express()
const db = require('./models')

require('dotenv').config()
const apiKey = process.env.API_KEY

let charsEndpoint = 'https://api.genshin.dev/characters'


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

/*
// Using Promise.all to iterate through each character and run an API call for each character.
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
                process.exit()
            })

        })
    }) )
})
*/



const grabCharDetailsAndCreate = (character) => {
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
        }).then(([char, wasCreated]) => { // Returns char object and boolean true or false.
            console.log(`🙈Character: ${char.name} \n wasCreated: ${wasCreated}`)
        })  
    })
}

const delayLoop = (fn, delay) => {
    return (charName, i) => {
        setTimeout(() => {
        grabCharDetailsAndCreate(charName)
      }, i * 1000)
    }
}

axios.get(charsEndpoint)
.then(response => {
    console.log('response', response)
    // response.data returns array of current characters, where each element is a string.
    response.data.forEach(delayLoop(grabCharDetailsAndCreate,1000))
})



/*
axios.get(charsEndpoint)
.then(response => {
    console.log('response', response)
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
*/


// Name of stockCharacter table
