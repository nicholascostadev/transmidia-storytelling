import { createRouter } from './context'
import z from 'zod'
import { validation } from '../../types/formValidation'

export const userRouter = createRouter()
  .mutation('register', {
    input: validation,
    async resolve({ input, ctx }) {
      return await ctx.prisma.registeredUser.create({
        data: {
          email: input.email,
          name: input.name,
          cpf: input.cpf,
          city: input.city,
          state: input.state,
          age: input.age,
          disabilities: input.disabilities,
          prev_knowledge: input.previousKnowledge,
          gender: input.gender,
          school_level: input.academic,
          occupation: input.occupation,
        },
      })
    },
  })
  .query('getUserInfo', {
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
