import { z } from 'zod'

export const validation = z.object({
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
  gender: z.enum(['M', 'F', 'NB', 'O', 'PNR']),
  academic: z.enum(['ensino-fundamental', 'ensino-medio', 'ensino-superior']),
  occupation: z.enum(['estudante', 'profissional']),
})

export type Gender = 'M' | 'F' | 'NB' | 'O' | 'PNR'
