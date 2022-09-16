import { createRouter } from './context'
import z from 'zod'

export const userRouter = createRouter()
  .mutation('register', {
    input: z.object({
      name: z.string().min(1, 'Nome é Obrigatório'),
      email: z.string().min(1, 'Email é Obrigatório').email(),
      cpf: z
        .string()
        .min(11, 'CPF deve que ter 11 dígitos')
        .max(11, 'CPF deve ter 11 dígitos'),
      city: z.string().min(1, 'Cidade deve ser informada'),
      state: z.string().min(1, 'Seu estado deve ser informado'),
      age: z
        .number()
        .min(18, 'A idade mínima para participar da pesquisa é de 18 anos'),
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
      console.log({
        disabilities: input.disabilities,
        previousKn: input.previousKnowledge,
      })
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
