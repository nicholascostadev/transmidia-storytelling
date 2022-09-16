import {
  Avatar,
  ButtonGroup,
  Center,
  Flex,
  FormLabel,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState, useEffect } from 'react'
import { DashboardHeader } from '../../components/Dashboard/DashboardHeader'
import { NotAllowed } from '../../components/NotAllowed'
import { trpc } from '../../utils/trpc'

type TUserPossiblePermissions = 'admin' | 'none'

export default function ManageUsers() {
  const { data, status } = useSession()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const toast = useToast()
  const userInfo = trpc.useQuery([
    'user.getUserInfo',
    { id: String(data?.user?.id) },
  ])
  const [users, setUsers] = useState({} as User[])
  const [lastAvailablePage, setLastAvailablePage] = useState(1)
  const infiniteUsers = trpc.useInfiniteQuery(
    ['auth.getInfiniteUsers', { limit: itemsPerPage }],
    {
      refetchOnWindowFocus: false,
      onSuccess: (lastPage) => {
        if (page === 1) {
          setUsers(lastPage.pages[0]?.items as User[])
        }
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    },
  )

  useEffect(() => {
    if (page > 0) {
      setUsers(infiniteUsers.data?.pages[page - 1]?.items as User[])
    }
    console.log({ currentPage: page })
  }, [infiniteUsers.data?.pages, page])

  const permissionMutate = trpc.useMutation(['auth.changeUserPermission'])
  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const hasMorePages = infiniteUsers.hasNextPage || lastAvailablePage > page

  if (
    (userInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
  ) {
    return <NotAllowed />
  }

  const formatPermission = (permission: string) => {
    return permission === 'admin' ? 'Administrador' : 'Nenhuma'
  }

  function handleChangePermission(
    userId: string,
    permission: TUserPossiblePermissions,
  ) {
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
          })
        },
        onSuccess: (response) => {
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
      <Center minH="calc(100vh - 72px)" display="flex" flexDirection="column">
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

        <Flex justify="space-between" w="1200px" maxW="100%" mt="2">
          <Flex justify="center" alignItems="center">
            <FormLabel>Itens por página</FormLabel>
            <NumberInput
              w="20"
              defaultValue={itemsPerPage}
              min={1}
              max={20}
              value={itemsPerPage}
              onChange={(value, valueAsNumber) =>
                setItemsPerPage(valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <ButtonGroup size="sm">
            <IconButton
              as={CaretLeft}
              disabled={page === 1}
              cursor="pointer"
              onClick={() => {
                setPage((page) => {
                  return page > 1 ? page - 1 : page
                })
              }}
              aria-label="Previous page icon"
            />
            <IconButton
              as={CaretRight}
              disabled={!hasMorePages}
              cursor="pointer"
              onClick={() => {
                infiniteUsers.fetchNextPage()
                console.log('Has next page: ', infiniteUsers.hasNextPage)
                console.log('Next available page: ', lastAvailablePage)
                if (hasMorePages) {
                  setPage((page) => page + 1)
                  setLastAvailablePage(page + 1)
                }
              }}
              aria-label="Next page icon"
            />
          </ButtonGroup>
        </Flex>
      </Center>
    </>
  )
}
