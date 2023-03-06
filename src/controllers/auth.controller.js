const {STATUS, succesResponse} = require('../utils/api.utils');
const {HTTPError}= require('../utils/errors.utils');
const {sendEmail} = require('../utils/email.utils');
const UsersDAO = require('../models/daos/users.dao');

const usersDAO = new UsersDAO();


class AuthController {
    async register(req, res, next) {
      const { fullName, email, password, phone } = req.body
  
      try {
        const user = await usersDAO.save({
          fullName,
          email,
          password,
          phone
        })
  
        
        const emailStyles = {
          card: 'border: 1px solid #ccc; padding: 12px; margin: 10px 0px; border-radius: 8px;',
          title: 'font-size: 18px; font-weight: bold;'
        }
  
        const registerDetailsCard = `
          <div style="${emailStyles.card}">
            <h3>${user.fullName}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
          </div>
        `
  
        const bodyHtml = `
          <h2 style="${emailStyles.title}">User Information</h2>
          ${registerDetailsCard}
        `
  
        sendEmail({
          subject: 'New User Registered',
          html: bodyHtml
        })
  
        const response = succesResponse({
          user,
          token: user.getSignedJwtToken()
        })
        res.status(STATUS.CREATED).json(response)
      } catch (err) {
        next(err)
      }
    }
  
    async login(req, res, next) {
      const { email, password } = req.body
  
      try {
        if (!email || !password) {
          const message = 'Please enter an email and password'
          throw new HTTPError(STATUS.BAD_REQUEST, message)
        }
  
        const user = await usersDAO.getByEmail(email)
  
        const isMatch = await user.matchPasswords(password)
  
        if (!isMatch) {
          const message = 'Email or password incorrect'
          throw new HTTPError(STATUS.UNAUTHORIZED, message)
        }
  
        const response = succesResponse({
          user,
          token: user.getSignedJwtToken()
        })
        res.status(STATUS.OK).json(response)
      } catch (err) {
        next(err)
      }
    }
  }
  
 module.exports= AuthController;