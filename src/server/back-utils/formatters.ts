/**
 * It takes the approval state and returns the translated state
 * @param {boolean} approval - boolean
 * @returns A function
 */
export function formatApproval(approval: boolean): string {
  return approval ? 'Aprovado' : 'Não aprovado'
}

export enum TABLE_TITLES {
  id = 'id',
  name = 'Nome',
  email = 'Email',
  confirmedEmail = 'Email confirmado',
  cpf = 'CPF',
  city = 'Cidade',
  state = 'Estado',
  age = 'Idade',
  disabilities = 'Deficiência',
  prev_knowledge = 'Conhecimento prévio',
  school_level = 'Escolaridade',
  occupation = 'Ocupação',
  approved = 'Estado de Aprovação',
  created_at = 'Data de registro',
  gender = 'Gênero',
}
