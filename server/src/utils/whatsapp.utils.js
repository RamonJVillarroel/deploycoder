const twilio = require('twilio')
const envConfig = require('../env.config')
const twilioClient = twilio(envConfig.TWILIO_ACCOUNT_SID , envConfig.TWILIO_AUTH_TOKEN)

const sendWhatsapp = async options => {
    await twilioClient.messages.create({
        body: options.message,
        from: `whatsapp:${envConfig.TWILIO_WHATSAPP}`,
        to: `whatsapp:${envConfig.ADMIN_WHATSAPP}`
    })
}

module.exports = {sendWhatsapp};


