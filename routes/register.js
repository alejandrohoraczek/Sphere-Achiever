//+ IMPORTING EXPRESS AND CREATING THE ROUTER
const express = require('express')
const router = express.Router()

//+ IMPORTING BCRYPT
const bcrypt = require('bcrypt')

//+ IMPORTING DIALOGS
const dialogs = require('../dialogs')
const { Users } = require('../Schemas')
const { urlencoded } = require('express')

//+ ALLOWING JSON AND BODY REQUEST TO BE PARSED
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

//+ DEFINING OUR ROUTES
router.post('/', async (req, res) => {
  //TODO REGISTRATION
  const { name, email, username, password } = req.body
  console.log(req.body)

  //+ VALIDATE EACH INPUT
  if (!name) res.status(403).send(dialogs.registration.noName)
  if (!email) res.status(403).send(dialogs.registration.noEMail)
  if (!username) res.status(403).send(dialogs.registration.noUsername)
  if (!password) res.status(403).send(dialogs.registration.noPassword)

  //TODO CHECK THE USERNAME OR EMAIL IS NOT ALREADY TAKEN
  try {
    const isUsernameOrEmailTaken = await Users.findOne({
      $or: [{ username: username }, { email: email }],
    })
    console.log(isUsernameOrEmailTaken)
    if (isUsernameOrEmailTaken) {
      if (isUsernameOrEmailTaken.username == username) {
        res.status(403).send(dialogs.registration.usernameTaken)
        return
      }
      if (isUsernameOrEmailTaken.email == email) {
        res.status(403).send(dialogs.registration.emailTaken)
        return
      }
    }

    //+ HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)

    //+ NOW THAT EVERYTHING IS OK, WE GUESS, WE PROCEED TO CREATE THE DB RECORD
    await Users.create({
      name,
      email,
      username,
      password: hashedPassword,
    })
    res.status(301).send(dialogs.registration.registrationSucceed)
  } catch (error) {
    console.log(error)
    res.status(401).send(dialogs.registration.registrationFailed)
  }
})

module.exports = router
