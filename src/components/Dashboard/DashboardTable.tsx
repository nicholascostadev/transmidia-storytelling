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
import Link from 'next/link'
import { CaretRight, Check, Swap } from 'phosphor-react'
import { Dispatch, SetStateAction } from 'react'
import { formatApproval } from '../../utils/formatters'

interface DashboardTableProps {
  usersToShow: RegisteredUser[]
  setUsersToShow: Dispatch<SetStateAction<RegisteredUser[]>>
  toggleApprovalMutation: any
}

export const DashboardTable = ({
  usersToShow,
  setUsersToShow,
  toggleApprovalMutation,
}: DashboardTableProps) => {
  const toast = useToast()
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const backgroundColor = useColorModeValue('white', '')

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
            <Th>Email</Th>
            <Th>Status de aprovação</Th>
            <Th>Respostas</Th>
          </Tr>
        </Thead>
        <Tbody>
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
                          <PopoverHeader>Confirmation</PopoverHeader>
                          <PopoverBody>
                            Tem certeza que deseja alterar o status do
                            <Text>
                              usuário para{' '}
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
