/**
 * It takes the approval state and returns the translated state
 * @param {boolean} approval - boolean
 * @returns A function
 */
export function formatApproval(approval: boolean): string {
  return approval ? 'Aprovado' : 'Não aprovado'
}
