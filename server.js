require('dotenv').config() // For using our hidden .env file.
const express = require('express') // For creating a web app.
const app = express()

const db = require('./models') // For sequelize models once we create our models and databases.
const axios = require('axios') // For grabbing endpoints/URLs. (APIs and web scraping)
const cheerio = require('cheerio') // For parsing information from endpoints. (Web scraping)
const ejs = require('ejs') // For embedded JavaScript.

const methodOverride = require('method-override') // For PUT and DELETE requests.

const session = require('express-session')
const passport = require('./config/passportConfig.js') // NEED TO CODE Separate to keep this file lean.
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js') 

// Middleware
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(methodOverride('_method'))  // Needs to be placed above anything related to HTTP request objects, including body-parse middleware. 
app.use(express.urlencoded({extended: false})) // Body-parser middleware.
app.use(express.static('public')) // So we can use CSS stylesheets and local images. 


// Session middleware (the documentation told us to do this)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Passport middleware HAS to be somewhere below session middleware.
app.use(passport.initialize())
app.use(passport.session())

// Flash middleware gets set up after session middleware, since it uses session.
app.use(flash())

// CUSTOM MIDDLEWARE that allows 'currentUser' to be a global object. Dependent on session on passport.
app.use((req, res, next) => {
    // Before every route, attach the flash messages and current user to res.locals so it's global on all ejs pages.
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user // res.locals already exists, creating a new item called currentUser.
    next() // Move on to next piece of middleware (the ones we use, under the hood they include these as well)
})

// Controller middleware.
app.use('/auth', require('./controllers/auth.js'))
app.use('/dashboard', require('./controllers/dashboard.js'))


app.get('/', (req, res) => {
    res.render('main/index.ejs')
})

app.get('/*', (req, res) => {
    res.render('main/404.ejs')
})

app.listen(process.env.PORT, () => {
    console.log("Listening on port 3000")
})


// Background image src: https://www.gensh.in/gallery/wallpaper#lg=1&slide=0 