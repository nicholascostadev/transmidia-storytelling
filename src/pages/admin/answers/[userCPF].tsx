import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { CaretLeft, Check, PencilLine } from 'phosphor-react'
import { useState } from 'react'

import { GeneralizedErrorPage } from '../../../components/GeneralizedErrorPage'
import { NotAllowed } from '../../../components/NotAllowed'
import { DashboardHeader } from '../../../components/pages/Dashboard/DashboardHeader'
import { Gender } from '../../../types/formValidation'
import {
  TABLE_TITLES,
  GENDER_OPTIONS,
  formatApproval,
} from '../../../utils/formatters'

import { trpc } from '../../../utils/trpc'

export default function Answers() {
  const { query } = useRouter()
  const { userCPF } = query
  const { data, status } = useSession()
  const toast = useToast()
  const [userInfo, setUserInfo] = useState<RegisteredUser | null>(
    {} as RegisteredUser,
  )
  const router = useRouter()
  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  const loggedUserInfo = trpc.useQuery([
    'user.getUserInfo',

    { id: String(data?.user?.id) },
  ])

  const toggleApprovalMutation = trpc.useMutation([
    'dashboard.toggleUserApproval',
  ])

  const { isLoading, error } = trpc.useQuery(
    ['dashboard.getUserAnswers', { cpf: String(userCPF) }],
    {
      onSuccess: (data) => setUserInfo(data),
      onError: (error) => console.error(error),
      refetchOnWindowFocus: false,
    },
  )

  if (
    (loggedUserInfo.data?.permission !== 'admin' && status !== 'loading') ||
    (!data && status !== 'loading')
  ) {
    return <NotAllowed />
  }

  if (error && error.message !== 'UNAUTHORIZED') {
    return <GeneralizedErrorPage />
  }

  function handleToggleApproval(userId: string, approvedStatus: boolean) {
    return () => {
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

  return (
    <>
      <DashboardHeader
        hasPermission={loggedUserInfo.data?.permission === 'admin'}
      />
      <Center display="flex" flexDirection="column" minH="calc(100vh - 72px)">
        <Flex justify="space-between" padding="2" w="61rem" maxW="100%">
          <Tooltip label="Voltar" rounded="md">
            <IconButton
              variant="unstyled"
              color="gray.500"
              _hover={{
                color: 'white',
              }}
              icon={<CaretLeft size={32} />}
              aria-label="Back history"
              onClick={() => router.back()}
            />
          </Tooltip>
        </Flex>
        <Grid
          overflow="hidden"
          templateColumns="repeat(2, 1fr)"
          bg={backgroundColor}
          border="1px"
          borderColor={borderColor}
          padding="4"
          rounded="md"
          w="60rem"
          maxW="100%"
        >
          <Stack spacing="0">
            {Object.keys((userInfo as RegisteredUser) ?? {}).map((key) => {
              return (
                <Text
                  key={key}
                  borderBottom="1px"
                  padding="2"
                  borderColor={borderColor}
                >
                  {TABLE_TITLES[key as keyof RegisteredUser]}
                </Text>
              )
            })}
          </Stack>
          <Stack spacing="0">
            {userInfo &&
              Object.keys(userInfo as RegisteredUser).map((key) => {
                if (key === 'created_at') {
                  return (
                    <Text
                      key={String(userInfo[key])}
                      borderBottom="1px"
                      borderLeft="1px"
                      borderColor={borderColor}
                      padding="2"
                    >
                      {format(
                        new Date(
                          String(userInfo[key as keyof RegisteredUser]),
                        ) || new Date(),
                        'PPPp',
                        {
                          locale: ptBR,
                        },
                      )}{' '}
                      (
                      {formatDistanceToNow(new Date(String(userInfo[key])), {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                      )
                    </Text>
                  )
                }
                if (key === 'approved') {
                  return (
                    <Flex
                      key={String(userInfo[key])}
                      borderBottom="1px"
                      borderLeft="1px"
                      borderColor={borderColor}
                      justify="space-between"
                    >
                      <Text padding="2">{formatApproval(userInfo[key])}</Text>
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
                              <PopoverHeader>Confirmation!</PopoverHeader>
                              <PopoverBody>
                                Tem certeza que deseja alterar o status do
                                usuário para{' '}
                                <Text
                                  as="span"
                                  color="red.500"
                                  fontWeight="bold"
                                >
                                  {formatApproval(!userInfo[key])}
                                </Text>
                                ?
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
                                      userInfo.id,
                                      userInfo.approved,
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
                  )
                }
                return (
                  <>
                    <Flex
                      borderBottom="1px"
                      borderLeft="1px"
                      borderColor={borderColor}
                    >
                      <Text
                        flex="1"
                        key={String(userInfo[key as keyof RegisteredUser])}
                        padding="2"
                      >
                        {key === 'gender'
                          ? GENDER_OPTIONS[userInfo[key] as Gender]
                          : String(
                              userInfo[key as keyof RegisteredUser] ||
                                'Nenhuma',
                            )}
                      </Text>
                    </Flex>
                  </>
                )
              })}
          </Stack>
        </Grid>
      </Center>
    </>
  )
}
