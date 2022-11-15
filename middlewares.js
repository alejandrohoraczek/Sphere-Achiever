const passport = require('passport')
const dialogs = require('./dialogs')

//+ DEFINING THE PASSPORT AUTHENTICATE MIDDLEWARE IN A CONST JUST TO MAKE IT EASIER TO READ
exports.authMiddleware = (req, res, next) => {
  passport.authenticate(
    'local',
    {
      failureFlash: true,
      successFlash: true,
      passReqToCallback: true, //if this set to true, we need to pass a callback with the done() function behaviour
    },
    (err, user, info) => {
      //this is the callback for the done() function
      console.log(
        `WE ARE AT authMiddleware(), INSIDE passport.authenticate() METHOD`
      )
      console.log('req.user?: ' + req.user)
      console.log('error?: ' + err)
      console.log('user object found on db: ' + user)
      console.log('message passed to client: ' + info)

      //check if there's an error or the user wasn't found
      if (err || !user) return res.status(401).send(info.message) // send the error response to client

      req.logIn(user, (err) => {
        // as user is found, passport needs that we invoke the logIn() method, =>
        // as we defined a done() function of our own
        if (err) {
          console.log('SOMETHING WENT WRONG: ' + err)
          return res.status(401).send(err.message) // send the error response to client
        } else {
          //there's no error, so we check if req.login did its purpose
          console.log('INSIDE REQ.LOGIN, CHECK IF REQ.USER WAS DEFINED HERE:')
          console.log(req.user)
          return next() // continue to next middleware if no error.
        }
      })
    }
  )(req, res, next) //had read this was needed for passport to understand the Request and Response objects
}

//+ CHECK IF THE USER IS AUTH OR NOT
exports.checkIfAuth = (req, res, next) => {
  console.log('WE ARE ON checkIfAuth() MIDDLEWARE')
  console.log('req.session: ')
  console.log(req.session)
  console.log('req.user: ' + req.user)
  console.log('req.session.passport: ' + req.session.passport)
  if (req.isAuthenticated()) {
    console.log('req.isAuthenticated() RETURNED TRUE')
    return next()
  }
  console.log('req.isAuthenticated() RETURNED FALSE')
  return res.status(401).send(dialogs.authentication.notAllowedToAccess) //telling the user that's not allowed to access
}

exports.checkIfNotAuth = (req, res, next) => {
  console.log('INSIDE checkIfNotAuth(), req.isAuthenticated() RETURNED: ')
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) {
    console.log('SO WE ARE ALLOWED TO CONTINUE TO LOG IN, CALLING next()')
    return next()
  }
  return res.status(401).send(dialogs.authentication.alreadyLoggedIn) //telling he/she/it is already logged in
}
