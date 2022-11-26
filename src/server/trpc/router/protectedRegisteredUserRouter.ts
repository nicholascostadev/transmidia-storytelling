import z from 'zod'
import { RegisteredUser } from '@prisma/client'
import { createModeratorRouter } from './moderatorMiddleware'

export const protectedRegisteredUserRouter = createModeratorRouter()
  .query('getAllRegisteredUsers', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      currentPage: z.number(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 10
      return await ctx.prisma.registeredUser.findMany({
        take: limit,
        skip: input.currentPage === 1 ? 0 : input.currentPage * limit - limit,
        orderBy: {
          created_at: 'desc',
        },
      })
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
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.registeredUser.findUnique({
        where: {
          id: input.id,
        },
      })
    },
  })
  .query('infiniteUsers', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      // cursor is CPF since it's unique
      cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      query: z.string().nullish(),
      filter: z.object({
        field: z.enum(['name', 'email']),
        approval: z.boolean().optional(),
      }),
    }),
    async resolve({ input, ctx }) {
      const limit = input.limit ?? 50
      const { cursor } = input

      const items = (await ctx.prisma.registeredUser.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { cpf: cursor } : undefined,
        orderBy: {
          created_at: 'desc',
        },
        where: {
          [input.filter.field]: {
            contains: input.query,
          },
          approved: {
            equals: input.filter.approval,
          },
        },
      })) as RegisteredUser[]

      let nextCursor: typeof cursor | undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem?.cpf
      }
      return {
        items,
        nextCursor,
      }
    },
  })
  .mutation('deleteUser', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.registeredUser.delete({
        where: {
          id: input.id,
        },
      })
    },
  })
