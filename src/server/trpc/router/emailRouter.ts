import { EMAIL_SECRET, sendMail } from '../../common/email-sending'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const emailRouter = router({
  sendMail: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string().email(),
        name: z.string(),
      }),
    )
    .mutation(({ input }) => {
      try {
        sendMail({ to: input.email, userId: input.userId, name: input.name })
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    }),
  confirmEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
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
        if (error instanceof Error) console.log(error.message)
      }
    }),
})
