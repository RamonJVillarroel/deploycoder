const nodemailer = require('nodemailer')
const envConfig = require('../env.config')
const {logger} = require('../logger/logger')

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'heloise97@ethereal.email',
      pass: 'n8wXmv9hdkvUA3qzmh'
    }
  })

  const mailOptions = {
    from: '"CHBP Server" heloise97@ethereal.email',
    to: envConfig.ADMIN_EMAIL,
    subject: options.subject,
    html: options.html
  }

  const info = await transporter.sendMail(mailOptions)

  logger.trace(
    `Email sended! Preview URL: ${nodemailer.getTestMessageUrl(info)}`
  )
}

module.exports = { sendEmail }
