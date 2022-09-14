import { createRouter } from './context'
import z from 'zod'

export const userRouter = createRouter()
  .mutation('register', {
    input: z.object({
      name: z.string().min(1),
      email: z.string().min(1).email(),
      cpf: z.string().min(11).max(11),
      cep: z.string().length(8).trim(),
      age: z.number().min(18),
      disabilities: z.string().optional(),
      previousKnowledge: z.string().optional(),
      sex: z.enum(['M', 'F']),
      academic: z.enum([
        'ensino-fundamental',
        'ensino-medio',
        'ensino-superior',
      ]),
      occupation: z.enum(['estudante', 'profissional']),
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
          sex: input.sex,
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
