const twilio = require('twilio');
const envConfig = require('../env.config')

const twilioClient = twilio(
    envConfig.TWILIO_ACCOUNT_SID,
    envConfig.TWILIO_AUTH_TOKEN
)
  
const sendSMS = async (options) => {
    await twilioClient.messages.create({
      body: options.message,
      from: envConfig.TWILIO_NUMBER,
      to: envConfig.ADMIN_WHATSAPP
    })
}

module.exports= {sendSMS}