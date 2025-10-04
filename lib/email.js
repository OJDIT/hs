
import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html }) {
  if (!process.env.SMTP_HOST) {
    console.log('SMTP not configured. Skipping sending email to', to)
    console.log('Email subject:', subject)
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'Heavenly Soundscapes <no-reply@heavenlysoundscapes.com>',
    to,
    subject,
    html
  })

  console.log('Email sent:', info.messageId)
}
