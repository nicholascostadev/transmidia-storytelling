import { EMAIL_SECRET, sendMail } from '../common/email-sending'
import { createProtectedRouter } from './context'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Example router with queries that can only be hit if the user requesting is signed in
export const emailRouter = createProtectedRouter()
  .mutation('sendMail', {
    input: z.object({
      userId: z.string(),
      email: z.string().email(),
    }),
    resolve({ input }) {
      sendMail({ to: input.email, userId: input.userId })
    },
  })
  .query('confirmEmail', {
    input: z.object({
      token: z.string(),
    }),
    async resolve({ input, ctx }) {
      try {
        const payload = jwt.verify(input.token, EMAIL_SECRET) as any

        return await ctx.prisma.registeredUser.update({
          where: {
            id: payload.userId,
          },
          data: {
            confirmedEmail: true,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  })
