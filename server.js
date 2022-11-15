//+ BRING ENVIROMENT VARIABLES INTO THE GAME
require('dotenv').config()

//+ IMPORTING EXPRESS AND OTHER MODULES
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')
const mongoose = require('mongoose')
const mongoDBSession = require('connect-mongodb-session')(session)
const passport = require('passport')

//+ INITIALIZING EXPRESS SERVER
const app = express()

//+ LOAD STATIC FILES AND ALLOWING TO PARSE FORM DATA & JSON REQ & RES & FLASH MESSAGES
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())

//+ CONNECTING TO MONGODB

mongoose.connect(process.env.MONGOURI + process.env.MONGODBNAME, (error) => {
  if (!error) console.log(`Loaded DB successfully`)
  else console.log(`Error connecting to DB: ${error}`)
})

//+ CREATING SESSION STORE ON MONGODB
const sessionStore = new mongoDBSession({
  uri: process.env.MONGOURI + process.env.MONGODBNAME,
  database: process.env.MONGODBNAME,
  collection: 'sessions',
})

//+ SETTING UP SESSIONS ENVIROMENT
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    // cookie: {
    //   secure: false, //had read this was needed sometimes on localhost, but didn't change anything
    // },
  })
)

//+ LOADING PASSPORT CONFIG
const initPassport = require('./passport-config')
initPassport(passport)

//+ INITIALIZING PASSPORT
app.use(passport.initialize())
app.use(passport.session())

//+ IMPORTING AND USING ROUTES
//+ **************************
//+ /LOGIN
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

//+ /LOGOUT
const logoutRouter = require('./routes/logout')
app.use('/logout', logoutRouter)

//+ /REGISTER
const registerRouter = require('./routes/register')
app.use('/register', registerRouter)

//+ SETTING UP SERVER ON DEFINED PORT
app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on port ${process.env.PORT || 4000}`)
)
