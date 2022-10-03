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

interface DashboardTableProps {
  usersToShow: RegisteredUser[]
  setUsersToShow: Dispatch<SetStateAction<RegisteredUser[]>>
  deleteUserMutation: any
  toggleApprovalMutation: any
}

export const DashboardTable = ({
  usersToShow,
  setUsersToShow,
  toggleApprovalMutation,
  deleteUserMutation,
}: DashboardTableProps) => {
  const toast = useToast()
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const [parent] = useAutoAnimate<HTMLTableSectionElement>()

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
    deleteUserMutation.mutate(
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
            <Th isNumeric></Th>
          </Tr>
        </Thead>
        <Tbody ref={parent}>
          {usersToShow?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.email}</Td>
              <Td>
                <Flex justify="start">
                  {formatApproval(user.approved)}
                  <Popover closeOnBlur={false}>
                    {({ onClose }) => (
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
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmação</PopoverHeader>
                          <PopoverBody>
                            Tem certeza que deseja alterar o status
                            <Text>
                              do usuário para{' '}
                              <Text as="span" color="red.500" fontWeight="bold">
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
                                isLoading={toggleApprovalMutation.isLoading}
                              >
                                Sim
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </>
                    )}
                  </Popover>
                </Flex>
              </Td>
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
              <Td>{format(user?.created_at, 'Pp', { locale: ptBR })}</Td>
              <Td isNumeric>
                <Popover closeOnBlur={false} placement="start">
                  {({ onClose }) => (
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
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton left="2" />
                        <PopoverHeader>Confirmação</PopoverHeader>
                        <PopoverBody color="red.500">
                          Tem certeza que deseja remover o
                          <Text> usuário da lista de inscritos?</Text>
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="flex-end">
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
                              isLoading={deleteUserMutation?.isLoading}
                            >
                              Sim
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
