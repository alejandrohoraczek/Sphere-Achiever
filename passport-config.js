const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const dialogs = require('./dialogs')
const { Users } = require('./Schemas')

function initialize(passport) {
  const authUser = async (req, usernameOrEmail, password, done) => {
    try {
      //+ LOOKING UP FOR DB REGISTRY
      const userDBRegistry = await Users.findOne({
        $or: [
          { username: `${usernameOrEmail}` },
          { email: `${usernameOrEmail}` },
        ],
      })

      //+ TELLING THE USER WASN'T FOUND
      if (!userDBRegistry) {
        return done(null, false, {
          message: dialogs.authentication.noUserWasFound,
        })
      }
      //+ COMPARING BOTH PASSWORDS
      const comparePassword = await bcrypt.compare(
        password,
        userDBRegistry.password
      )
      //+ EVERYTHING WENT NICE
      if (comparePassword) {
        console.log(
          'USER WAS FOUND AND PASSWORD IS CORRECT AT PASSPORT VERIFY FUNCTION'
        )
        userDBRegistry.password = null
        return done(null, userDBRegistry, {
          message: dialogs.authentication.authenticationSucceed,
        })
      }
      //+ WELL, NOT REALLY. TELLING THE USER THE PASSWORD IS INCORRECT.
      else
        return done(null, false, {
          message: dialogs.authentication.passwordIncorrect,
        })
    } catch (error) {
      console.log(`THERE'S AN ERROR AT PASSPORT VERIFY FUNCTION`)
      console.log(error)
      //+ SAYING THERE'S AN ERROR ON THE SERVER
      return done(error, false, {
        message: dialogs.authentication.authenticationError,
      })
    }
  }

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
      },
      authUser
    )
  )
  passport.serializeUser((user, done) => {
    console.log('PRE-serialized')
    console.log(user)
    done(null, user._id)
    console.log('serialized with user._id: ' + user._id)
  })
  passport.deserializeUser((id, done) => {
    console.log(id)
    console.log('deerializedddd')
    Users.findById(id, (error, user) => {
      if (!error) console.log('consulta sin error, objeto devuelto' + user)
      done(error, user)
    }).projection({ password: 0, _id: 0 })
  })
}

module.exports = initialize
