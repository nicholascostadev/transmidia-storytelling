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

export const genderOptions = [
  {
    title: 'Mulher cisgênera',
    value: 'woman-cisgender',
  },
  {
    title: 'Homem cisgênero',
    value: 'man-cisgender',
  },
  {
    title: 'Mulher transexual/transgênera',
    value: 'woman-transgender',
  },
  {
    title: 'Homem transexual/transgênero',
    value: 'man-transgender',
  },
  {
    title: 'Não binário',
    value: 'non-binary',
  },
  {
    title: 'Prefiro não me classificar',
    value: 'prefer-not-to-classify',
  },
] as const

export const genderValues = genderOptions.map((option) => option.value)
