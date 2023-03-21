const {STATUS } = require('../utils/api.utils') 
const  {errorResponse}  = require('../utils/errors.utils') 
const {logger} = require('../logger/logger') 

const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'hubo un error'
  const details = err.details || ""

  logger.error(`${status} ${message} ${details}`)
  const ERRORR=errorResponse(message, status)
return res.status(status).json(ERRORR);

}

module.exports= {errorMiddleware}


