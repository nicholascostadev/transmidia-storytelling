import {
  Avatar,
  Center,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { trpc } from '../../utils/trpc'

export default function ManageUsers() {
  const { data, status } = useSession()
  const toast = useToast()
  const userInfo = trpc.useQuery([
    'user.getUserInfo',
    { id: String(data?.user?.id) },
  ])
  const [users, setUsers] = useState({} as User[])
  trpc.useQuery(['auth.getAllUsers'], {
    onSuccess: (data) => setUsers(data),
  })
  const permissionMutate = trpc.useMutation(['auth.changeUserPermission'])
  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  if (
    (userInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
  ) {
    return <NotAllowed />
  }

  function handleChangePermission(userId: string, permission: string) {
    console.log('Called with: ', { userId, permission })
    permissionMutate.mutate(
      {
        id: userId,
        newPermission: permission,
      },
      {
        onError: (error) => {
          toast({
            title: 'Erro.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
            colorScheme: 'purple',
          })
        },
        onSuccess: (response) => {
          toast({
            title: 'Alterado.',
            description: `A permissão do usuário foi alterada para ${response.permission} com sucesso`,
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
                <Th maxW="20">User Profile Image</Th>
                <Th>Email</Th>
                <Th>Permissões</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.length > 0 &&
                users?.map((user) => (
                  <Tr key={user.id}>
                    <Td maxW="20">
                      <Avatar name={user.name ?? ''} src={user?.image ?? ''} />
                    </Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Select
                        defaultValue={user.permission}
                        onChange={(e) =>
                          handleChangePermission(user.id, e.target.value)
                        }
                      >
                        <option value="none">none</option>
                        <option value="admin">admin</option>
                      </Select>
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
