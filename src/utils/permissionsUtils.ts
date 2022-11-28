export type TUserPossiblePermissions = 'admin' | 'moderator' | 'none'

export const canSeeDashboard = (
  permission: TUserPossiblePermissions,
): boolean => permission === 'admin' || permission === 'moderator'
