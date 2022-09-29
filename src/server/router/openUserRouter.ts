import { createRouter } from './context'
import z from 'zod'

export const openUserRouter = createRouter().query('getUserInfo', {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    })
  },
})
