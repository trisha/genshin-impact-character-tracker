// Passport config.
// const passport = require('passport')
// const db = require('../models')
// const LocalStrategy = require('passport-local')

// Serializing is compressing our user information into one identifier, in this case we're using user.id.
// -----------> SERIALIZATION SET UP <-----------
// Tell passport to serialize the user using user.id by passing it into the doneCallback
// passport.serializeUser((user, doneCallback) => {
//     doneCallback(null, user.id)
// })

// Deserializing tells passport how to deserialize the user by looking them up in the database, based on user.id (which is stored in the session).
// Serial ID is user.id. doneCallback is a built-in callback parameter to passport.