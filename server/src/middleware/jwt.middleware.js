const envConfig = require('../env.config')
const jwt = require('jsonwebtoken')
const { STATUS } = require('../utils/api.utils')
const { HTTPError } = require('../utils/errors.utils')
const UsersDAO = require('../models/daos/users.dao')

const usersDAO = new UsersDAO()

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);
    if (!decoded.admin) {
      return next(new HTTPError(STATUS.UNAUTHORIZED, 'no estas autorizado'));
    }
    return next();
  } catch (err) {
    return next(new HTTPError(STATUS.UNAUTHORIZED, 'no estas autorizado'))
  }
};

const authMiddleware = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {

    return next(new HTTPError(STATUS.UNAUTHORIZED, 'debes estar autenticado'))
  }

  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET)

    const user = await usersDAO.getById(decoded.id)

    if (!user) {
      return next(new HTTPError(STATUS.UNAUTHORIZED, 'no se coincide con el token'))
    }
    req.user = user;

    next()
  } catch (error) {
    return next(new HTTPError(STATUS.UNAUTHORIZED, 'debes estar autenticado'))
  }

}
module.exports = { adminMiddleware, authMiddleware }

