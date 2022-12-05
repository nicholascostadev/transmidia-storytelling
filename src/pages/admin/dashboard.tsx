import { Center, Spinner } from '@chakra-ui/react'

import { NotAllowed } from '../../components/NotAllowed'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { useLoggedInfo } from '../../hooks'
import { DashboardContent } from '../../components/pages/Dashboard/DashboardContent'

export default function Dashboard() {
  const { userInfo, isLoading, canSeeDashboard } = useLoggedInfo()

  // FIXME: FIX THIS Typing
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  if (!canSeeDashboard) {
    return <NotAllowed isModerator={userInfo?.permission === 'moderator'} />
  }

  return (
    <>
      <DashboardHeader permission={userInfo?.permission} />
      <DashboardContent isAdmin={userInfo?.permission === 'admin'} />
    </>
  )
}
