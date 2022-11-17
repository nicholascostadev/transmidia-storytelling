import { EMAIL_SECRET, sendMail } from '../common/email-sending'
import { createRouter } from './context'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'

export const emailRouter = createRouter()
  .mutation('sendMail', {
    input: z.object({
      userId: z.string(),
      email: z.string().email(),
      name: z.string(),
    }),
    resolve({ input }) {
      try {
        sendMail({ to: input.email, userId: input.userId, name: input.name })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    },
  })
  .query('confirmEmail', {
    input: z.object({
      token: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const payload = jwt.verify(input.token, EMAIL_SECRET) as JwtPayload

        return await ctx.prisma.registeredUser.update({
          where: {
            id: payload.userId,
          },
          data: {
            confirmedEmail: true,
          },
        })
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
      }
    },
  })
