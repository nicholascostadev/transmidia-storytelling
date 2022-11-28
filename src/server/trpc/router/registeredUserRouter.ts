import { GENDER_OPTIONS } from '@root/utils/formatters'
import { router, publicProcedure, adminModRouter, adminRouter } from '../trpc'
import { validation } from '../../../../@types/formValidation/index'
import { z } from 'zod'
import { RegisteredUser } from '@prisma/client'

export const registeredUserRouter = router({
  register: publicProcedure
    .input(validation)
    .mutation(async ({ ctx, input }) => {
      const academic = input.academic
        .split('-')
        .join(' ')
        .split('')
        .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
        .join('')
      const noDisabilities = input.disabilities === '' || !input.disabilities
      const noPrevKnowledge =
        input.previousKnowledge === '' || !input.previousKnowledge

      const formattedData = {
        ...input,
        academic,
        disabilities: noDisabilities ? 'Nenhuma' : input.disabilities,
        previousKnowledge: noPrevKnowledge ? 'Nenhum' : input.previousKnowledge,
        gender: GENDER_OPTIONS[input.gender],
        cpf: input.cpf.replace(/\D/g, ''),
      } as any

      return await ctx.prisma.registeredUser.create({
        data: {
          email: formattedData.email,
          name: formattedData.name,
          cpf: formattedData.cpf,
          city: formattedData.city,
          state: formattedData.state,
          age: formattedData.age,
          disabilities: formattedData.disabilities,
          prev_knowledge: formattedData.previousKnowledge,
          gender: formattedData.gender,
          school_level: formattedData.academic,
          occupation: formattedData.occupation,
        },
      })
    }),
  getAll: adminModRouter
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        currentPage: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10
      return await ctx.prisma.registeredUser.findMany({
        take: limit,
        skip: input.currentPage === 1 ? 0 : input.currentPage * limit - limit,
        orderBy: {
          created_at: 'desc',
        },
      })
    }),
  toggleApproval: adminModRouter
    .input(
      z.object({
        id: z.string(),
        approved: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registeredUser.update({
        where: {
          id: input.id,
        },
        data: {
          approved: !input.approved,
        },
      })
    }),
  getUserInfo: adminModRouter
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
  getUserAnswers: adminModRouter
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.registeredUser.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  infiniteUsers: adminModRouter
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        // cursor is CPF since it's unique
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
    }),
  deleteUser: adminRouter
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registeredUser.delete({
        where: {
          id: input.id,
        },
      })
    }),
})