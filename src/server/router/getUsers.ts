import { createProtectedRouter } from './context'
import z from 'zod';

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedUserRouter = createProtectedRouter()
  .query('getAllUsers', {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany()
    },
  })
  .mutation("changeUserPermission", {
    input: z.object({
      id: z.string(),
      newPermission: z.string()
    }),
    async resolve({input,ctx}) {
      return await ctx.prisma.user.update({
        where: {
          id: input.id
        },
        data: {
          permission: input.newPermission
        }
      })
    }
  })
