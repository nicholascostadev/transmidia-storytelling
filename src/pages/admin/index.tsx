import {
  Button,
  Center,
  Divider,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretLeft, GoogleLogo } from 'phosphor-react'
import { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { trpc } from '../../utils/trpc'

const signInSchema = z.object({
  username: z
    .string()
    .min(1, 'O nome de usuário é Obrigatório')
    .max(20, 'O nome de usuário pode ter no máximo 20 caracteres'),
  password: z.string(),
})

type TSignIn = z.infer<typeof signInSchema>

export default function AdminSignIn() {
  const { data: userSession, status } = useSession()
  const userInfo = trpc.useQuery([
    'openUser.getUserInfo',
    { id: String(userSession?.user?.id) },
  ])
  const router = useRouter()

  const {
    register,
    formState: { errors },
  } = useForm<TSignIn>({
    resolver: zodResolver(signInSchema),
  })

  const formBg = useColorModeValue('white', 'gray.900')
  const formBorder = useColorModeValue('1px', 'none')
  const formBorderColor = useColorModeValue('gray.100', 'none')
  const shadow = useColorModeValue('xl', 'none')

  const handleSignIn = (e: SyntheticEvent) => {
    e.preventDefault()
    signIn('email')
  }

  useEffect(() => {
    if (userInfo.data?.permission === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [router, userInfo.data?.permission])

  return (
    <>
      <DashboardHeader hasPermission={userInfo?.data?.permission === 'admin'} />
      <Center height="calc(100vh - 72px)">
        <Stack
          as="form"
          w="450px"
          onSubmit={handleSignIn}
          bg={formBg}
          shadow={shadow}
          border={formBorder}
          borderColor={formBorderColor}
          p="5"
          rounded="lg"
        >
          <Input
            label="Usuário"
            colorScheme="purple"
            error={errors.username}
            {...register('username')}
            isDisabled
          />
          <Input
            label="Senha"
            colorScheme="purple"
            error={errors.password}
            {...register('password')}
            isDisabled
          />
          <Button type="submit" colorScheme="purple" isDisabled>
            Entrar
          </Button>
          <Text variant=""></Text>
          <Flex justify="center" alignItems="center" gap="2" py="3">
            <Divider />
            <Text>OU</Text>
            <Divider />
          </Flex>
          <Button
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<GoogleLogo />}
            isLoading={
              (status === 'authenticated' &&
                userInfo.data?.permission !== 'none') ||
              status === 'loading'
            }
            colorScheme="red"
            isDisabled={!!userSession}
            onClick={() => signIn('google')}
          >
            <Center>
              <Text>{'Entrar com sua conta Google'}</Text>
            </Center>
          </Button>
          {userInfo?.data?.permission === 'none' && (
            <Stack>
              <Text color="red.400" textAlign="center">
                Você já está logado, porém não tem permissões de administrador,
                peça para um administrador lhe dar direitos ou você está no
                lugar errado.
              </Text>
              <Link href="/participate" passHref>
                <ChakraLink
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="blue.400"
                >
                  <CaretLeft size={20} />
                  Voltar para a tela de participação
                </ChakraLink>
              </Link>
            </Stack>
          )}
        </Stack>
      </Center>
    </>
  )
}
