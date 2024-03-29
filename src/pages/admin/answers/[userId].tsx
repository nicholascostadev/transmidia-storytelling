import {
  Center,
  Flex,
  IconButton,
  Spinner,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { useRouter } from 'next/router'
import { CaretLeft, Trash } from 'phosphor-react'
import { useState } from 'react'

import { GeneralizedErrorPage } from '../../../components/GeneralizedErrorPage'
import { NotAllowed } from '../../../components/NotAllowed'
import { DashboardHeader } from '../../../components/pages/Dashboard/DashboardHeader'
import { UserTable } from '../../../components/pages/userId/UserTable'
import { useLoggedInfo } from '../../../hooks'
import { trpc } from '../../../utils/trpc'

export default function Answers() {
  const { query } = useRouter()
  const { userId } = query
  const { userInfo: loggedUserInfo, canSeeDashboard } = useLoggedInfo()
  const toast = useToast()
  const [userInfo, setUserInfo] = useState<RegisteredUser | null>(
    {} as RegisteredUser,
  )
  const router = useRouter()
  const { colorMode } = useColorMode()

  const backgroundColor = useColorModeValue('gray.100', '')

  const { isLoading, error } = trpc.registeredUser.getUserAnswers.useQuery(
    { id: String(userId) },
    {
      onSuccess: (data) => setUserInfo(data),
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    },
  )

  const { mutate: deleteRegisteredUser } =
    trpc.registeredUser.deleteUser.useMutation()

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }

  if (!canSeeDashboard) {
    return (
      <NotAllowed isModerator={loggedUserInfo?.permission === 'moderator'} />
    )
  }

  if (error && error.message !== 'UNAUTHORIZED') {
    return <GeneralizedErrorPage />
  }

  function handleDeleteUser(id?: string) {
    if (!id) return

    deleteRegisteredUser(
      { id },
      {
        onError: () => {
          toast({
            title: 'Erro.',
            description: 'Erro ao deletar usuário',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        },
        onSuccess: () => {
          toast({
            title: 'Deletado',
            description: 'Usuário deletado com sucesso',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
          router.push('/dashboard')
        },
      },
    )
  }

  if (isLoading) {
    return (
      <>
        <Center h="calc(100vh - 72px)">
          <Spinner />
        </Center>
      </>
    )
  }

  if (!userInfo) {
    return (
      <>
        <DashboardHeader permission={loggedUserInfo?.permission} />
        <Center flexDir="column" h="calc(100vh - 72px)">
          <Text color="red.500">Usuário não encontrado</Text>
          <Text
            color="gray.400"
            _hover={{ color: 'white' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            onClick={() => router.back()}
          >
            <CaretLeft />
            Voltar
          </Text>
        </Center>
      </>
    )
  }

  return (
    <>
      <DashboardHeader permission={loggedUserInfo?.permission} />
      <Center
        display="flex"
        flexDirection="column"
        minH="calc(100vh - 72px)"
        bg={backgroundColor}
      >
        <Flex justify="space-between" padding="2" w="61rem" maxW="100%">
          <Tooltip label="Voltar" rounded="md">
            <IconButton
              variant="unstyled"
              color="gray.500"
              _hover={{
                color: colorMode === 'light' ? 'gray.900' : 'white',
              }}
              icon={<CaretLeft size={32} />}
              aria-label="Back history"
              onClick={() => router.back()}
            />
          </Tooltip>
          <Tooltip label="Deletar usuário" rounded="md">
            <IconButton
              variant="unstyled"
              color="gray.500"
              _hover={{
                color: 'red.500',
              }}
              icon={<Trash size={32} />}
              aria-label="Back history"
              onClick={() => handleDeleteUser(userInfo?.id)}
            />
          </Tooltip>
        </Flex>

        <UserTable
          setUserInfo={setUserInfo}
          userInfo={userInfo as RegisteredUser}
          isAdmin={loggedUserInfo?.permission === 'admin'}
        />
      </Center>
    </>
  )
}
