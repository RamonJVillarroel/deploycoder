const envConfig = require('../env.config') 
const  {logger} =require('../logger/logger') 

const adminMiddleware = (req, res, next) => {
  const { url, method } = req
  const isAdmin = envConfig.ADMIN === 'true'

  if (!isAdmin) {
    logger.trace('Route not authorized')
    return res.status(401).json({
      error: -1,
      description: `route ${url} method ${method} not authorized`
    })
  }

  next()
}

module.exports= {adminMiddleware}
