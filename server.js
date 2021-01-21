const express = require('express') // For creating a web app.
const app = express()
const layouts = require('express-ejs-layouts') // For layout.ejs.

const axios = require('axios') // For grabbing endpoints/URLs. (APIs and web scraping)
const cheerio = require('cheerio') // For parsing information from endpoints. (Web scraping)
const ejs = require('ejs') // For embedded JavaScript.

const methodOverride = require('method-override') // For PUT and DELETE requests.

// const db = require('./models') // For sequelize models once we create our models and databases.

// Middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use(methodOverride('_method'))  // Needs to be placed above anything related to HTTP request objects, including body-parse middleware. 
app.use(express.urlencoded({extended: false})) // Body-parser middleware.
// app.use(express.static(__dirname + '/public')) // For being able to use CSS stylesheets. https://stackoverflow.com/questions/24582338/how-can-i-include-css-files-using-node-express-and-ejs

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('main/index.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})