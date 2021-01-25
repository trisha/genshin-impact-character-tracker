// Passport config.
const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')

// -----------> SERIALIZATION SET UP <-----------
// Serializing is compressing our user information into one identifier, in this case we're using user.id.
// Tell passport to serialize the user using user.id by passing it into the doneCallback
passport.serializeUser((user, doneCallback) => {
    doneCallback(null, user.id)
})

// -----------> DESERIALIZATION SET UP <-----------
// Deserializing tells passport how to deserialize the user by looking them up in the database, based on user.id (which is stored in the session).
// Serial ID is user.id. doneCallback is a built-in callback parameter to passport.
passport.deserializeUser((id, doneCallback) => {
    db.user.findByPk(id)
    .then(foundUser => {
        doneCallback(null,foundUser)
    })
    .catch(err => {
        console.log("🐸ERROR deserializing user")
    })
})

// -----------> STRATEGY SET UP <-----------
const findAndLogInUser = (email, password, doneCallback) => {
    db.user.findOne({where: {email: email.toLowerCase()}})
    .then(async foundUser => {
        let match
        if (foundUser) {
            // Check that the password matches.
            match = await foundUser.validPassword(password) // Calling our custom .validPassword method on user defined in ../models/user.js
        }
        if (!foundUser || !match) { // We have this in addition to .catch because this isn't an error, this is missing a user/wrong credentials.
            console.log("🐸Password was NOT validated, i.e. match is false")
            return doneCallback(null, false)
        } else { // User was legit.
            return doneCallback(null, foundUser)
        }
    })
    .catch(err => doneCallback(err)) // The one time we don't put null as the first callback, since the first parameter is otherwise meant to receive an error.
}


// Default fields that this strategy checks is username and password, but we want email and password.
// Constructor's (new LocalStrategy) FIRST ARGUMENT: (fieldsToCheck) is an object that indicates how we'll be referring to the two fields we're checking for, where we check for email instead of username.
// SECOND ARGUMENT: A callback that is ready to receive the two fields we're checking, as well as a doneCallback.
const fieldsToCheck = {
    usernameField: 'email',
    passwordField: 'password'
}

const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser) // LocalStrategy is our import instance of passport-local.

passport.use(strategy)

module.exports = passport