//+ IMPORTING EXPRESS AND CREATING THE ROUTER
const express = require('express')
const passport = require('passport')
const router = express.Router()

//+ IMPORTING MIDDLEWARE AND DIALOGS
const { checkIfAuth } = require('../middlewares')
const dialogs = require('../dialogs')

//+ DEFINING OUR ROUTES
router.get('/', checkIfAuth, (req, res) => {
  req.logOut((e) => {
    if (e) return res.status(504).send(dialogs.authentication.logOutError)
    return res.status(200).send(dialogs.authentication.loggedOut)
  })
})

module.exports = router
