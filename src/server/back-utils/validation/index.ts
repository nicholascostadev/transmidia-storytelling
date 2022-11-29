import { z } from 'zod'
import { validateCPF } from './cpf'

export const validation = z.object({
  name: z.string().min(1, 'Nome é Obrigatório'),
  email: z.string().min(1, 'Email é Obrigatório').email(),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos').refine(validateCPF, {
    message: 'CPF informado não existe',
  }),
  // Can be used like that for testing purposes, not in production
  // cpf: z.string().length(11, "CPF inválido")
  city: z.string().min(1, 'Cidade deve ser informada'),
  state: z.string().min(1, 'Seu estado deve ser informado'),
  age: z
    .number()
    .min(18, 'A idade mínima para participar da pesquisa é de 18 anos'),
  disabilities: z.string().optional(),
  previousKnowledge: z.string().optional(),
  gender: z.enum([
    'MASCULINO',
    'FEMININO',
    'NAO_BINARIO',
    'OUTROS',
    'PREFIRO_NAO_DIZER',
  ]),
  academic: z.enum(['ensino-fundamental', 'ensino-medio', 'ensino-superior']),
  occupation: z.enum(['estudante', 'profissional']),
})

export type FormData = z.infer<typeof validation>
