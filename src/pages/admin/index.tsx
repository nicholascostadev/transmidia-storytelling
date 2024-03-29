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
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretLeft, GoogleLogo } from 'phosphor-react'
import { SyntheticEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../../components/Input'
import { DashboardHeader } from '../../components/pages/Dashboard/DashboardHeader'
import { useLoggedInfo } from '../../hooks'

const signInSchema = z.object({
  username: z
    .string()
    .min(1, 'O nome de usuário é Obrigatório')
    .max(20, 'O nome de usuário pode ter no máximo 20 caracteres'),
  password: z.string(),
})

type TSignIn = z.infer<typeof signInSchema>

export default function AdminSignIn() {
  const { userInfo, isLoading, canSeeDashboard, authenticated } =
    useLoggedInfo()

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
    if (canSeeDashboard) {
      router.push('/admin/dashboard')
    }
  }, [router, canSeeDashboard])

  return (
    <>
      <DashboardHeader permission={userInfo?.permission} />
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
              (authenticated && userInfo?.permission !== 'none') || isLoading
            }
            colorScheme="red"
            isDisabled={authenticated}
            onClick={() => signIn('google')}
          >
            <Center>
              <Text>{'Entrar com sua conta Google'}</Text>
            </Center>
          </Button>
          {userInfo?.permission === 'none' && (
            <Stack>
              <Text color="red.400" textAlign="center">
                Você já está logado, porém não tem permissões de administrador,
                peça para um administrador lhe dar direitos ou você está no
                lugar errado.
              </Text>
              <ChakraLink
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="blue.400"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfBo8-HhD5rPZZ6l4vMisPyZh52ANfDYhroCNM8t_2l8evtGA/viewform?usp=sharing"
                target="_blank"
                rel="noreferrer"
                as={Link}
              >
                <CaretLeft size={20} />
                Voltar para a tela de participação
              </ChakraLink>
            </Stack>
          )}
        </Stack>
      </Center>
    </>
  )
}
