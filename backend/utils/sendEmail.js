const nodemailer = require('nodemailer')

// Sends an email via SMTP (e.g. Gmail App Password).
// If SMTP is not configured, the email is printed to the console instead (dev fallback).
const sendEmail = async ({ to, subject, text, html }) => {
  const { EMAIL_USER, EMAIL_PASS } = process.env

  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('\n📧 [DEV EMAIL — SMTP not configured]')
    console.log(`To: ${to}\nSubject: ${subject}\n${text}\n`)
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  })

  await transporter.sendMail({
    from: `"FurniHub" <${EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  })
}

module.exports = sendEmail;