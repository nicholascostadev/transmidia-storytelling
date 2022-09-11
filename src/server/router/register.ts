import { z } from 'zod'
import { createRouter } from './context'

export const register = createRouter().mutation('register', {
  input: z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    cep: z.string(),
    age: z.number(),
    disabilities: z.string().optional(),
    previousKnowledge: z.string(),
    gender: z.string(),
    academic: z.string(),
    occupation: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.registeredUser.create({
      data: {
        email: input.email,
        name: input.name,
        cpf: input.cpf,
        cep: input.cep,
        age: input.age,
        deficiency: input.disabilities,
        prev_knowledge: input.previousKnowledge,
        sex: input.gender,
        school_level: input.academic,
        occupation: input.occupation,
      },
    })
  },
})
