import {
  canSeeDashboard as canSeeDashboardHelperFn,
  TUserPossiblePermissions,
} from '@root/utils/permissionsUtils'
import { trpc } from '@root/utils/trpc'
import { useSession } from 'next-auth/react'

export const useLoggedInfo = () => {
  const { data, status } = useSession()
  const { data: userInfo, ...rest } = trpc.user.getUserInfo.useQuery(
    { id: String(data?.user?.id) },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )

  const canSeeDashboard = canSeeDashboardHelperFn(
    userInfo?.permission as TUserPossiblePermissions,
  )
  const isAdmin = userInfo?.permission === 'admin'
  const authenticated = status === 'authenticated'
  const unauthenticated = status === 'unauthenticated'

  return {
    userInfo,
    canSeeDashboard,
    isAdmin,
    authenticated,
    unauthenticated,
    ...rest,
  }
}
