const axios = require('axios')
const express = require('express')
const app = express()

require('dotenv').config()
const apiKey = process.env.API_KEY

let endpoint = 'https://api.genshin.dev/characters'

axios.get(endpoint)
.then(response => {
    console.log(response.data[0]) // returns list of characters
})