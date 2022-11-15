const dialogs = {
  registration: {
    noUsername: 'No pusiste el usuario pa!',
    noName: 'Te faltó el nombre, cape.',
    noEMail: 'Eu, y el mail?',
    noPassword: 'La contraseña salame, me extraña...',
    usernameTaken: 'Te primerearon el usuario.',
    emailTaken: 'Alguien ya se registró con ese mail.',
    registrationFailed:
      'Mirá no sé qué paso pero no hay sistema. Vení la semana que viene.',
    registrationSucceed: 'Eaaa, estás registrado papu/mamuuu',
  },
  authentication: {
    noUserWasFound: 'No encontramos un usuario con ese nombre, loquito',
    passwordIncorrect: 'La contraseña está mal',
    authenticationError:
      'La verdad no sé que onda, pero hubo un error en el server y el garrón te lo comés vos',
    authenticationSucceed: 'Sos vos perrito, estás adentro.',
    notAllowedToAccess: 'No tenés la chapa suficiente.',
    alreadyLoggedIn: 'Boludo ya estás logueado',
    loggedOut: 'Listo, nos re vimo.',
    logOutError: 'No tengo idea por qué no puedo cerrar tu sesión.',
  },
}

module.exports = dialogs
