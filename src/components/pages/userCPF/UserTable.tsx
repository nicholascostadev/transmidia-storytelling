import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
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
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Check, PencilLine } from 'phosphor-react'
import { Dispatch, SetStateAction } from 'react'

import { formatApproval, TABLE_TITLES } from '../../../utils/formatters'
import { trpc } from '../../../utils/trpc'

interface UserTableProps {
  userInfo: RegisteredUser
  setUserInfo: Dispatch<SetStateAction<RegisteredUser | null>>
  isAdmin: boolean
}

export const UserTable = ({
  userInfo,
  setUserInfo,
  isAdmin,
}: UserTableProps) => {
  const toast = useToast()

  const toggleApprovalMutation = trpc.useMutation([
    'protectedRegisteredUser.toggleUserApproval',
  ])

  const backgroundColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.100', 'gray.700')
  const shadow = useColorModeValue('sm', 'none')

  function handleToggleApproval(userId: string, approvedStatus: boolean) {
    if (!isAdmin) return

    setUserInfo((oldUserInfo) => {
      if (oldUserInfo) {
        return {
          ...oldUserInfo,
          approved: !oldUserInfo.approved,
        }
      } else return null
    })

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

          setUserInfo((oldUserInfo) => {
            if (oldUserInfo) {
              return {
                ...oldUserInfo,
                approved: !oldUserInfo.approved,
              }
            } else return null
          })
        },
        onSuccess: () => {
          toast({
            title: 'Alterado',
            description: `Usuário alterado para ${formatApproval(
              !approvedStatus as boolean,
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

  return (
    <TableContainer
      maxW="100%"
      w="60rem"
      border="1px"
      rounded="md"
      borderColor={borderColor}
      shadow={shadow}
    >
      <Table variant="simple" overflow="scroll" bg={backgroundColor}>
        <Tbody>
          {userInfo &&
            Object.keys(userInfo).map((key) => {
              if (key === 'created_at') {
                return (
                  <Tr key={key}>
                    <Td>{TABLE_TITLES[key]}</Td>
                    <Td>
                      {format(
                        new Date(
                          String(userInfo[key as keyof RegisteredUser]),
                        ) || new Date(),
                        'PPPp',
                        {
                          locale: ptBR,
                        },
                      )}
                    </Td>
                  </Tr>
                )
              }

              if (key === 'approved') {
                return (
                  <Tr key={key}>
                    <Td>{TABLE_TITLES[key]}</Td>
                    <Td>
                      <Flex
                        key={String(userInfo[key])}
                        alignItems="center"
                        justify="space-between"
                      >
                        <Text>{formatApproval(userInfo[key])}</Text>
                        {isAdmin && (
                          <Popover closeOnBlur={false} placement="top">
                            {({ onClose }) => (
                              <>
                                <PopoverTrigger>
                                  <IconButton
                                    variant="ghost"
                                    icon={<PencilLine />}
                                    colorScheme="pink"
                                    aria-label="Change user's approval status"
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
                                      {' '}
                                      do usuário para
                                      <Text
                                        as="span"
                                        color="red.500"
                                        fontWeight="bold"
                                      >
                                        {' '}
                                        {formatApproval(!userInfo[key])}
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
                                        onClick={() =>
                                          handleToggleApproval(
                                            userInfo.id,
                                            userInfo.approved,
                                          )
                                        }
                                        isLoading={
                                          toggleApprovalMutation.isLoading
                                        }
                                      >
                                        Sim
                                      </Button>
                                    </ButtonGroup>
                                  </PopoverFooter>
                                </PopoverContent>
                              </>
                            )}
                          </Popover>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                )
              }

              return (
                <Tr key={key}>
                  <Td>{TABLE_TITLES[key as keyof typeof TABLE_TITLES]}</Td>
                  <Td>
                    {String(
                      key === 'confirmedEmail'
                        ? userInfo[key as keyof RegisteredUser]
                          ? 'Confirmado'
                          : 'Não confirmado'
                        : userInfo[key as keyof RegisteredUser],
                    )}
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
