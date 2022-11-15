export const isAdmin = (permission: string | undefined) =>
  permission === 'admin'

export const isModOrAdmin = (permission: string | undefined) =>
  permission === 'admin' || permission === 'moderator'
