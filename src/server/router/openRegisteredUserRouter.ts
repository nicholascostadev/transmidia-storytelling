import { createRouter } from './context'
import z from 'zod'
import { validation } from '../../../@types/formValidation'
import { GENDER_OPTIONS } from '../../utils/formatters'

export const openRegisteredUserRouter = createRouter()
  .mutation('register', {
    input: validation,
    async resolve({ input, ctx }) {
      // We receive this data as: 999.999.999-99, but we need to save it as 99999999999
      console.log({ previousKnowledge: input.previousKnowledge })
      const formattedData = {
        ...input,
        academic: input.academic
          .split('-')
          .join(' ')
          .split('')
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join(''),
        disabilities:
          input.disabilities === '' || !input.disabilities
            ? 'Nenhuma'
            : input.disabilities,
        previousKnowledge:
          input.previousKnowledge === '' || !input.previousKnowledge
            ? 'Nenhum'
            : input.previousKnowledge,
        gender: GENDER_OPTIONS[input.gender],
        cpf: input.cpf.replace(/\D/g, ''),
      } as any
      console.log({ formattedPreviousKnowledge: formattedData.prev_knowledge })

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
    },
  })
  // TODO: This route should be protected
  // move it to `protectedRegisteredUserRouter`
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
