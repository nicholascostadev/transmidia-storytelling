'use strict'
import { env } from '../../env/server.mjs'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

export const EMAIL_SECRET =
  'fajsDHFKLAJHFJHEIURHASDJKFKLAJHTUIAJAHSBDFKLJAHBSUHGoiufhqawejfhdakljh'

interface SendMailProps {
  to: string
  userId: string
}
// This code is for working with Mailgun if needed

// export async function sendMail({ to, userId }: sendEmailProps) {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.mailgun.org',
//     port: 587,
//     secure: false,
//     auth: {
//       user: env.MAILGUN_USERNAME, // generated ethereal user
//       pass: env.MAILGUN_PASSWORD, // generated ethereal password
//     },
//   })

//   jwt.sign(
//     { userId },
//     EMAIL_SECRET,
//     {
//       expiresIn: '1d',
//     },
//     (err, emailToken) => {
//       if (err) return console.log(err)

//       const url = `http://localhost:3000/confirm/${emailToken}`
//       transporter.sendMail(
//         {
//           from: '"nicholascosta 👻" <nicholascostadev@gmail.com>', // sender address
//           to, // list of receivers
//           subject: 'Hello Nicholas✔', // Subject line
//           text: 'Hello world?', // plain text body
//           html: `<b>Confirm email: <a href="${url}">${url}</a></b>`, // html body
//         },
//         (err, info) => {
//           if (err) return console.log(err)
//           return console.log(info)
//         },
//       )
//     },
//   )
// }

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

export const sendMail = ({ to, userId }: SendMailProps) => {
  jwt.sign(
    { userId },
    EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    async (err, emailToken) => {
      if (err) console.log('Error when trying to sign email token: ', err)

      sgMail.setApiKey(env.SENDGRID_API_KEY)

      const url = `${env.NEXTAUTH_URL}/confirmation/${emailToken}`
      const msg = {
        to, // Change to your recipient
        from: 'nicholascostadev@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<b>Confirm email: <a href="${url}">${url}</a></b>
        if it wasn't you that registered, please, ignore this email.
        `, // html body
      }

      sgMail
        .send({
          ...msg,
          templateId: 'd-0decf04e469d4739a929fd54b93c157b',
          dynamicTemplateData: {
            confirmationUrl: url,
          },
        })
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.log('Error when sending email: ', error)
        })
    },
  )
}
