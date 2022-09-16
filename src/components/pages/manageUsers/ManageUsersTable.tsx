import {
  Avatar,
  Select,
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
import { TUserPossiblePermissions } from '../../../pages/admin/manageusers'
interface ManageUsersTableProps {
  users: User[]
  permissionMutate: any
}

export const ManageUsersTable = ({
  users,
  permissionMutate,
}: ManageUsersTableProps) => {
  const toast = useToast()
  const { data } = useSession()

  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const formatPermission = (permission: string) => {
    return permission === 'admin' ? 'Administrador' : 'Nenhuma'
  }

  function handleChangePermission(
    userId: string,
    permission: TUserPossiblePermissions,
  ) {
    if (userId === data?.user?.id) {
      return toast({
        status: 'error',
        title: 'Você não pode alterar suas próprias permissões',
      })
    }

    permissionMutate.mutate(
      {
        id: userId,
        newPermission: permission,
      },
      {
        onError: (error: any) => {
          toast({
            title: 'Erro.',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        },
        onSuccess: (response: any) => {
          toast({
            title: 'Alterado.',
            description: `A permissão do usuário ${
              response.name
            } foi alterada para ${formatPermission(
              response.permission,
            )} com sucesso`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        },
      },
    )
  }

  return (
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
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td maxW="20">
                <Avatar name={user.name ?? ''} src={user?.image ?? ''} />
              </Td>
              <Td>
                {user.email === data?.user?.email
                  ? user.email + '(você)'
                  : user.email}
              </Td>
              <Td>
                <Select
                  defaultValue={user.permission}
                  onChange={(e) =>
                    handleChangePermission(
                      user.id,
                      e.target.value as TUserPossiblePermissions,
                    )
                  }
                >
                  <option value="none">Nenhuma</option>
                  <option value="admin">Administrador</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
