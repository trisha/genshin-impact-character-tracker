module.exports = (req, res, next) => {
    if (!req.user) { // If no one is logged in.
        req.flash('error', "You must be logged in to access that page.")
        res.redirect('/auth/login')
    } else {
        next()
    }
}