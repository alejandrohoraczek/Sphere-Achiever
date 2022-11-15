//+ IMPORTING EXPRESS AND CREATING THE ROUTER
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const passport = require('passport')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

//+ IMPORTING MIDDLEWARE AND DIALOGS
const {
  authMiddleware,
  checkIfAuth,
  checkIfNotAuth,
} = require('../middlewares')
const dialogs = require('../dialogs')

//+ DEFINING OUR ROUTES
router.post(
  '/',
  (req, res, next) => {
    //This middleware is to log the initialization of this thing :)
    console.log('HERE IS WHERE ALL STARTS')
    console.log('REQ.BODY:')
    console.log(req.body)
    next()
  },
  checkIfNotAuth, //if user's not already logged in, they can log in
  authMiddleware, //checking user and password with passport middleware at middlewares.js
  (req, res) => {
    console.log(
      `FINALLY WE ARE AT THE LAST MIDDLEWARE. HERE PASSPORT HAVE SET THE REQ PROPERTIES`
    )
    console.log('req.session.passport.user: ' + req.session.passport.user)
    console.log('req.user: ' + req.user)
    //sending response that everything went okay
    res.status(200).send(dialogs.authentication.authenticationSucceed)
    console.log(
      'CHECK TO SEE IF USER IS LOGGED IN WITH req.isAuthenticated(): '
    )
    console.log(req.isAuthenticated())
  }
)

router.get('/checkAuth', checkIfAuth, (req, res) => {
  console.log('USER IS LOGGED')
  res.send(req.isAuthenticated() + req.user)
})

module.exports = router
