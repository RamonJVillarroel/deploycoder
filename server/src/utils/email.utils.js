const nodemailer = require('nodemailer');
const envConfig = require('../env.config');
const {logger} = require('../logger/logger');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: envConfig.ADMIN_EMAIL,
    pass: envConfig.ADMIN_PASSWORD,
  },
});

async function sendEmail(options) {
  const mailOptions = {
    from: 'deploy fin',
    to: envConfig.ADMIN_EMAIL,
    subject: options.subject,
    html: options.html
  };

  const info = await transporter.sendMail(mailOptions);

  logger.trace(
    `email enviado: ${nodemailer.getTestMessageUrl(info)}`
  );
}

module.exports = { sendEmail };
