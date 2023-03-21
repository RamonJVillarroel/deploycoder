const { STATUS ,succesResponse} = require('../utils/api.utils');
const { register, login } = require('../services/auth.services');


class AuthController {
  async register(req, res, next) {
    const { fullName, email, password, phone } = req.body
    try {
      const user = await register(fullName, email, password, phone)
      const response = succesResponse({
        user,
        token: user.getSignedJwtToken()
      })
      res.status(STATUS.OK).json(response)
    } catch (err) {
      next(err)
    }
  }


  async login(req, res, next) {
    const { email, password } = req.body
    try {
      const user = await login(email, password)
      const response = succesResponse({
        user,
        token: user.getSignedJwtToken()
      })
      res.status(STATUS.OK).json(response)
    }
    catch (err) {
      next(err)
    }
  }

}
module.exports = AuthController;