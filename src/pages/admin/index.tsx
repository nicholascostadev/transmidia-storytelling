import { Button, Center, Divider, Flex, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
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
  const { data, status } = useSession()
  const userInfo = trpc.useQuery([
    'user.getUserInfo',
    { id: String(data?.user?.id) },
  ])
  const router = useRouter()

  const {
    register,
    formState: { errors },
  } = useForm<TSignIn>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn = (e: SyntheticEvent) => {
    e.preventDefault()
    signIn('email')
  }

  useEffect(() => {
    if (userInfo.data?.permission === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [data, router, status, userInfo.data])

  return (
    <>
      <Header />
      <Center height="calc(100vh - 72px)">
        <Stack as="form" w="96" onSubmit={handleSignIn}>
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
            leftIcon={<FcGoogle />}
            colorScheme="red"
            onClick={() => signIn('google')}
          >
            <Center>
              <Text>Entrar com sua conta Google</Text>
            </Center>
          </Button>
        </Stack>
      </Center>
    </>
  )
}
