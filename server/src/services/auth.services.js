const { STATUS } = require('../utils/api.utils');
const { HTTPError } = require('../utils/errors.utils');
const UsersDAO = require('../models/daos/users.dao');
const assingCartUser = require('./users.services');
const { sendEmail } = require('../utils/email.utils');

const usersDAO = new UsersDAO()


const register = async (fullName, email, password, phone) => {
  const user = await usersDAO.save({
    fullName,
    email,
    password,
    phone
  })

  const newUser = await assingCartUser(user._id)

  newUser.password = undefined

  const emailOptions = {
    subject: 'nuevo registro',
    html: `
    <H1>nuevo registro!</h1>
    <p>detalles del usuario:</p>
    <ul>
        <li><strong>Nombre:</strong> ${newUser.fullName}</li>
        <li><strong>Email:</strong> ${newUser.email}</li>
        <li><strong>telefono:</strong> ${newUser.phone}</li>
      </ul>
 ` }
  await sendEmail(emailOptions)

  return newUser
}


const login = async (email, password) => {
  if (!email || !password) {
    const message = "igrese mail y contraseña"
    throw new HTTPError(STATUS.BAD_REQUEST, message)
  }
  const user = await usersDAO.getByEmail(email)
  const isMatch = await user.matchPasswords(password, user.password)

  if (!isMatch) {
    const message = 'email o contraseña incorrecto'
    throw new HTTPError(STATUS.UNAUTHORIZED, message)
  }

  user.password = undefined
  return user
}

module.exports = {
  register,
  login
}