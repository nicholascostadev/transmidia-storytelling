import { Button, Center, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { GoogleLogo } from 'phosphor-react'
import { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
    <Center height="100vh">
      <Stack as="form" w="96" onSubmit={handleSignIn}>
        <Input
          label="Usuário"
          colorScheme="purple"
          error={errors.username}
          {...register('username')}
        />
        <Input
          label="Senha"
          colorScheme="purple"
          error={errors.password}
          {...register('password')}
        />
        <Button type="submit" colorScheme="purple">
          Entrar
        </Button>
        <Button
          colorScheme="red"
          w={'full'}
          maxW={'md'}
          variant={'outline'}
          leftIcon={<GoogleLogo />}
          onClick={() => signIn('google')}
        >
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      </Stack>
    </Center>
  )
}
