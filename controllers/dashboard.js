const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('../config/passportConfig.js') // Import module we coded.

router.get('/', (req, res) => {
    res.send("Dashboard page")
})

module.exports = router