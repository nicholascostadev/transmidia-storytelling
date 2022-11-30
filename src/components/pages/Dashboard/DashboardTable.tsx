import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import { CaretRight, Check, Swap, Trash } from 'phosphor-react'
import { Dispatch, SetStateAction } from 'react'
import { formatApproval } from '../../../utils/formatters'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { trpc } from '@root/utils/trpc'

interface DashboardTableProps {
  usersToShow: RegisteredUser[]
  setUsersToShow: Dispatch<SetStateAction<RegisteredUser[]>>
  isAdmin: boolean
}

export const DashboardTable = ({
  usersToShow,
  setUsersToShow,
  isAdmin,
}: DashboardTableProps) => {
  const toast = useToast()
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const [parent] = useAutoAnimate<HTMLTableSectionElement>()

  const { mutate: toggleApproval, isLoading: isTogglingApproval } =
    trpc.registeredUser.toggleApproval.useMutation()
  const { mutate: deleteUser, isLoading: isDeletingRegisteredUser } =
    trpc.registeredUser.deleteUser.useMutation()

  function handleToggleApproval(userId: string, approvedStatus: boolean) {
    return () => {
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

      toggleApproval(
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
            })
          },
        },
      )
    }
  }

  function handleDeleteUser(id: string) {
    deleteUser(
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
          setUsersToShow((prev) => prev.filter((user) => user.id !== id))
          toast({
            title: 'Deletado',
            description: 'Usuário deletado com sucesso',
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
    <TableContainer maxW="100%" w="1200px" rounded="md" shadow="sm">
      <Table variant="simple" overflow="scroll" bg={backgroundColor}>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Status de aprovação</Th>
            <Th>Respostas</Th>
            <Th>Data de Registro</Th>
            {isAdmin && <Th isNumeric></Th>}
          </Tr>
        </Thead>
        <Tbody ref={parent}>
          {usersToShow?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.email}</Td>
              <Td>
                <Flex justify="start">
                  {formatApproval(user.approved)}
                  <Popover closeOnBlur={false} placement="end">
                    {({ onClose }: { onClose: () => void }) => (
                      <>
                        <PopoverTrigger>
                          <IconButton
                            cursor="pointer"
                            size="xs"
                            variant="ghost"
                            as={Swap}
                            colorScheme="pink"
                            aria-label=""
                            ml="2"
                          >
                            Trocar
                          </IconButton>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmação</PopoverHeader>
                            <PopoverBody>
                              Tem certeza que deseja alterar o status
                              <Text>
                                do usuário para{' '}
                                <Text
                                  as="span"
                                  color="red.500"
                                  fontWeight="bold"
                                >
                                  {formatApproval(!user.approved)}
                                </Text>
                                ?
                              </Text>
                            </PopoverBody>
                            <PopoverFooter
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ButtonGroup size="sm">
                                <Button
                                  variant="outline"
                                  colorScheme="red"
                                  onClick={onClose}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  leftIcon={<Check />}
                                  colorScheme="purple"
                                  onClick={handleToggleApproval(
                                    user.id,
                                    user.approved,
                                  )}
                                  isLoading={isTogglingApproval}
                                >
                                  Sim
                                </Button>
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Portal>
                      </>
                    )}
                  </Popover>
                </Flex>
              </Td>
              <Td>
                <ChakraLink
                  as={Link}
                  href={`/admin/answers/${user.id}`}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                >
                  Ver Respostas
                  <Icon as={CaretRight} />
                </ChakraLink>
              </Td>
              <Td>{format(user?.created_at, 'Pp', { locale: ptBR })}</Td>
              {isAdmin && (
                <Td isNumeric>
                  <Popover closeOnBlur={false} placement="start">
                    {({ onClose }: { onClose: () => void }) => (
                      <>
                        <PopoverTrigger>
                          <IconButton
                            icon={<Trash size={20} />}
                            variant="unstyled"
                            _hover={{
                              color: 'red.500',
                            }}
                            aria-label="Delete registered user"
                          />
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmação</PopoverHeader>
                            <PopoverBody color="red.500">
                              Tem certeza que deseja remover o
                              <Text> usuário da lista de inscritos?</Text>
                            </PopoverBody>
                            <PopoverFooter
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ButtonGroup size="sm">
                                <Button
                                  variant="outline"
                                  colorScheme="red"
                                  onClick={onClose}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  leftIcon={<Check />}
                                  colorScheme="purple"
                                  onClick={() => handleDeleteUser(user.id)}
                                  isLoading={isDeletingRegisteredUser}
                                >
                                  Sim
                                </Button>
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Portal>
                      </>
                    )}
                  </Popover>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
