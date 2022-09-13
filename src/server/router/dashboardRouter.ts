import { createProtectedRouter } from './context'
import z from 'zod'

export const dashboardRouter = createProtectedRouter()
  .query('getAllRegisteredUsers', {
    async resolve({ ctx }) {
      return await ctx.prisma.registeredUser.findMany()
    },
  })
  .mutation('toggleUserApproval', {
    input: z.object({
      id: z.string(),
      approved: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.registeredUser.update({
        where: {
          id: input.id,
        },
        data: {
          approved: !input.approved,
        },
      })
    },
  })
  .query('getUserAnswers', {
    input: z.object({
      cpf: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.registeredUser.findUnique({
        where: {
          cpf: input.cpf,
        },
      })
    },
  })
