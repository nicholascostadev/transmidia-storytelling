export const firstStepInputs = [
  {
    title: 'Nome',
    field: 'name',
    type: 'string',
  },
  {
    title: 'Email',
    field: 'email',
    type: 'string',
  },
  {
    title: 'CPF',
    field: 'cpf',
    type: 'string',
  },
  {
    title: 'Idade',
    field: 'age',
    type: 'number',
  },
] as const

export const secondStepInputs = [
  {
    title: 'Possui alguma deficiência?',
    field: 'disabilities',
    type: 'string',
  },
  {
    title: 'Possui conhecimento prévio na área científica?',
    field: 'previousKnowledge',
    type: 'string',
  },
] as const

export const genderOptions = [
  {
    title: 'Masculino',
    value: 'MASCULINO',
  },
  {
    title: 'Feminino',
    value: 'FEMININO',
  },
  {
    title: 'Não-binário',
    value: 'NAO_BINARIO',
  },
  {
    title: 'Outros',
    value: 'OUTROS',
  },
  {
    title: 'Prefiro não responder',
    value: 'PREFIRO_NAO_DIZER',
  },
] as const
