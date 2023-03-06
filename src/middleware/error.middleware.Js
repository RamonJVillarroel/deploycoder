const {STATUS } =require('../utils/api.utils') 
const { errorResponse } =require('../utils/api.utils') 
const {logger} =require('../logger/logger') 

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'An unexpected error ocurred'

  logger.error(message)
  return res.status(status).json(errorResponse(message))
}

module.exports= {errorMiddleware}
