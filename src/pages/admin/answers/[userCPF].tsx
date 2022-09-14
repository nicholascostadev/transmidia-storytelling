import {
  Center,
  Flex,
  Grid,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { RegisteredUser } from '@prisma/client'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/router'
import { CaretLeft, PencilLine } from 'phosphor-react'
import { useState } from 'react'
import { DashboardHeader } from '../../../components/Dashboard/DashboardHeader'
import { NotAllowed } from '../../../components/NotAllowed'
import { formatApproval } from '../../../utils/formatters'
import { trpc } from '../../../utils/trpc'

export default function Answers() {
  const { query } = useRouter()
  const { userCPF } = query
  const [error, setError] = useState('' as any)

  const toggleApprovalMutation = trpc.useMutation([
    'dashboard.toggleUserApproval',
  ])
  const toast = useToast()
  const { data } = trpc.useQuery(
    ['dashboard.getUserAnswers', { cpf: String(userCPF) }],
    {
      onSuccess: (data) => {
        setUserInfo(data)
      },
      onError: (error) => {
        console.log(error)
        setError(error)
      },
    },
  )
  const [userInfo, setUserInfo] = useState<RegisteredUser | null>(
    data as RegisteredUser,
  )
  console.log(userInfo)
  const router = useRouter()

  const backgroundColor = useColorModeValue('white', '')
  const borderColor = useColorModeValue('gray.100', 'gray.700')

  if (error.message === 'UNAUTHORIZED') {
    return <NotAllowed />
  }

  function handleToggleApproval(userId: string, approvedStatus: boolean) {
    return () => {
      console.log('a')

      // Make this work
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
    <>
      <DashboardHeader />
      <Center display="flex" flexDirection="column" minH="calc(100vh - 72px)">
        <Flex
          justify="space-between"
          padding="2"
          mb="2rem"
          w="61rem"
          maxW="100%"
        >
          <Tooltip label="Voltar" rounded="md">
            <IconButton
              icon={<CaretLeft size={32} />}
              aria-label="Back history"
              onClick={() => router.back()}
            />
          </Tooltip>
          <div></div>
        </Flex>
        <Grid
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
                  {key}
                </Text>
              )
            })}
          </Stack>
          <Stack spacing="0">
            {userInfo
              ? Object.keys(userInfo as RegisteredUser).map((key) => {
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
                          'PPP',
                          {
                            locale: ptBR,
                          },
                        )}
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
                        <Text padding="2">
                          {String(formatApproval(userInfo[key]))}
                        </Text>
                        <IconButton
                          variant="ghost"
                          colorScheme="pink"
                          aria-label="Toggle Approval"
                          icon={<PencilLine />}
                          onClick={handleToggleApproval(
                            userInfo.id,
                            userInfo[key],
                          )}
                        />
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
                        {/* @ts-ignore */}
                        <Text flex="1" key={String(userInfo[key])} padding="2">
                          {String(
                            userInfo[key as keyof RegisteredUser] || 'Nenhuma',
                          )}
                        </Text>
                      </Flex>
                    </>
                  )
                })
              : ''}
          </Stack>
        </Grid>
      </Center>
    </>
  )
}
