import { env } from '../../env/server.mjs'
import jwt from 'jsonwebtoken'
import formData from 'form-data'
import Mailgun from 'mailgun.js'

export const EMAIL_SECRET = env.EMAIL_SECRET
const API_KEY = env.MAILGUN_PRIVATE_API_KEY
const PUBLIC_API_KEY = env.MAILGUN_PUBLIC_API_KEY
const DOMAIN = env.MAILGUN_DOMAIN

const mailgun = new Mailgun(formData)
const client = mailgun.client({
  username: 'api',
  key: API_KEY,
  public_key: PUBLIC_API_KEY,
})

interface SendMailProps {
  name: string
  to: string
  userId: string
}

export async function sendMail({ to, userId, name }: SendMailProps) {
  jwt.sign(
    { userId },
    EMAIL_SECRET,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      if (err) return console.log(err)

      const url = `${env.NEXTAUTH_URL}/confirmation/${emailToken}`

      const messageData = {
        from: 'Transmidia Storytelling <nicholascostadev@gmail.com>',
        to,
        subject: 'Confirmação de email',
        template: 'transmidia-confirmation',
        'h:X-Mailgun-Variables': JSON.stringify({
          link: url,
          name,
        }), // html body
      }

      client.messages
        .create(DOMAIN, { ...messageData })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  )
}
