import {
  Button,
  Center,
  Icon,
  Link as ChakraLink,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { CaretRight, PencilLine } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { formatApproval } from '../../utils/formatters'
import { trpc } from '../../utils/trpc'

export default function Dashboard() {
  const { data, status } = useSession()
  const toast = useToast()
  const userInfo = trpc.useQuery([
    'user.getUserInfo',
    { id: String(data?.user?.id) },
  ])
  const { data: registeredUsers } = trpc.useQuery(
    ['dashboard.getAllRegisteredUsers'],
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 5, // 5 minutes
    },
  )

  const toggleApprovalMutation = trpc.useMutation([
    'dashboard.toggleUserApproval',
  ])

  const [usersToShow, setUsersToShow] = useState(registeredUsers)
  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  function handleToggleApproval(userId: string, approvedStatus: boolean) {
    return () => {
      console.log('a')

      setUsersToShow((users) =>
        users?.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              approved: !user.approved,
            }
          }

          return user
        }),
      )

      toggleApprovalMutation.mutate(
        { id: userId, approved: approvedStatus },
        {
          onError: () => {
            toast({
              title: 'Erro.',
              description: 'Erro ao alterar status de aprovação',
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
              colorScheme: 'purple',
            })
            setUsersToShow((users) =>
              users?.map((user) => {
                if (user.id === userId) {
                  return {
                    ...user,
                    approved: approvedStatus,
                  }
                }

                return user
              }),
            )
          },
          onSuccess: () => {
            toast({
              title: 'Alterado',
              description: `Usuário alterado para ${formatApproval(
                !approvedStatus,
              )}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
              colorScheme: 'purple',
            })
          },
        },
      )
    }
  }

  useEffect(() => {
    setUsersToShow(registeredUsers)
  }, [registeredUsers])

  if (
    (userInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
  ) {
    return <NotAllowed />
  }

  if (status === 'loading') {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <>
      <DashboardHeader />
      <Center minH="calc(100vh - 72px)">
        <TableContainer
          maxW="100%"
          w="1200px"
          border="1px"
          rounded="md"
          borderColor={borderColor}
        >
          <Table variant="simple" overflow="scroll" bg={backgroundColor}>
            <Thead>
              <Tr>
                <Th>Email</Th>
                <Th>Status de aprovação</Th>
                <Th>Respostas</Th>
                <Th isNumeric>Editar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersToShow?.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.email}</Td>
                  <Td>{formatApproval(user.approved)}</Td>
                  <Td>
                    <Link href={`/admin/answers/${user.cpf}`} passHref>
                      <ChakraLink
                        display="flex"
                        justifyContent="start"
                        alignItems="center"
                      >
                        Ver Respostas
                        <Icon as={CaretRight} />
                      </ChakraLink>
                    </Link>
                  </Td>
                  <Td isNumeric>
                    <Tooltip
                      label="Alterar entre aprovado ou não aprovado"
                      rounded="md"
                      colorScheme="pink"
                    >
                      <Button
                        leftIcon={<PencilLine />}
                        onClick={handleToggleApproval(user.id, user.approved)}
                        colorScheme="pink"
                      >
                        Trocar
                      </Button>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </>
  )
}
