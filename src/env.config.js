require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  ADMIN: process.env.ADMIN || false,
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_NUMBER: process.env.TWILIO_NUMBER|| '',
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP|| '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ||'',
  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP||'',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE
}