import { createProtectedRouter } from './context'
import z from 'zod'

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedUserRouter = createProtectedRouter()
  .query('getInfiniteUsers', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
    }),
    async resolve({ input, ctx }) {
      const limit = input.limit ?? 50
      const { cursor } = input
      const items = await ctx.prisma.user.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
      })
      let nextCursor: typeof cursor | undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem?.id
      }
      return {
        items,
        nextCursor,
      }
    },
  })
  .mutation('changeUserPermission', {
    input: z.object({
      id: z.string(),
      newPermission: z.enum(['admin', 'none']),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          permission: input.newPermission,
        },
      })
    },
  })
