import { User } from '@prisma/client'
import { z } from 'zod'
import { router, publicProcedure, adminModRouter, adminRouter } from '../trpc'

export const userRouter = router({
  getUserInfo: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  getInfiniteUsers: adminModRouter
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        query: z.string().nullish(),
        filter: z.object({
          field: z.enum(['name', 'email']),
          approval: z.boolean().optional(),
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50
      const { cursor } = input

      let items: User[]
      if (input.query) {
        items = await ctx.prisma.user.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,
          where: {
            [input.filter.field]: {
              contains: input.query,
            },
          },
        })
      } else {
        items = await ctx.prisma.user.findMany({
          take: limit + 1, // get an extra item at the end which we'll use as next cursor
          cursor: cursor ? { id: cursor } : undefined,
        })
      }
      let nextCursor: typeof cursor | undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem?.id
      }
      return {
        items,
        nextCursor,
      }
    }),
  changePermission: adminRouter
    .input(
      z.object({
        id: z.string(),
        newPermission: z.enum(['admin', 'moderator', 'none']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          permission: input.newPermission,
        },
      })
    }),
})
