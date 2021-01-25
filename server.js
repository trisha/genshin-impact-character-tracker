require('dotenv').config // For using our hidden .env file.
const express = require('express') // For creating a web app.
const app = express()
const layouts = require('express-ejs-layouts') // For layout.ejs.

const axios = require('axios') // For grabbing endpoints/URLs. (APIs and web scraping)
const cheerio = require('cheerio') // For parsing information from endpoints. (Web scraping)
const ejs = require('ejs') // For embedded JavaScript.

const methodOverride = require('method-override') // For PUT and DELETE requests.

const session = require('express-session')
const passport = require('./config/passportConfig.js') // NEED TO CODE Separate to keep this file lean.
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js') 

const db = require('./models') // For sequelize models once we create our models and databases.

// Middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use(methodOverride('_method'))  // Needs to be placed above anything related to HTTP request objects, including body-parse middleware. 
app.use(express.urlencoded({extended: false})) // Body-parser middleware.
app.use(express.static('public')) // So we can use CSS stylesheets and local images. 

// Controller middleware.
app.use('/auth', require('./controllers/auth.js'))

app.get('/', (req, res) => {
    res.render('main/index.ejs')
})

app.get('/*', (req, res) => {
    res.render('main/404.ejs')
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})


// Background image src: https://www.gensh.in/gallery/wallpaper#lg=1&slide=0 