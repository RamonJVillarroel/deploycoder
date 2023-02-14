const jwt = require('jsonwebtoken')
const envConfig = require( '../env.config')
const { STATUS } = require( '../utils/api.utils')
const UsersDAO = require('../models/daos/users.dao')
const { HTTPError } = require( '../utils/errors.utils')

const usersDAO = new UsersDAO()

const authMiddleware = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new HTTPError(
        STATUS.UNAUTHORIZED,
        'Not authorized to access this route'
      )
    )
  }

  try {

    const decoded = jwt.verify(token, envConfig.JWT_SECRET)

    const user = await usersDAO.getById(decoded.id)

    if (!user) {
      return next(
        new HTTPError(STATUS.NOT_FOUND, 'No user found with this id')
      )
    }

    req.user = user
    next()
  } catch (error) {
    return next(
      new HTTPError(
        STATUS.UNAUTHORIZED,
        'Not authorized to access this route'
      )
    )
  }
}

module.exports= {authMiddleware}
