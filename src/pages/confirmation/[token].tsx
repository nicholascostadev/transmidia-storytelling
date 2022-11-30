import { Center, Heading, Icon, Spinner, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { HandsClapping, MaskSad } from 'phosphor-react'

import { ContactWidget } from '../../components/ContactWidget'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'

export default function ConfirmEmail() {
  const { query } = useRouter()
  const { token } = query
  const { isSuccess, isLoading } = trpc.email.confirmEmail.useQuery({
    token: String(token),
  })

  if (isLoading) {
    return (
      <Center h="100vh" display="flex" gap="4">
        <Spinner />
        <Text>Aguarde um momento...</Text>
      </Center>
    )
  }

  return (
    <>
      <Head>
        <title>TST | Confirmado</title>
      </Head>
      <Header />
      <Center h="calc(100vh - 72px)">
        <Stack textAlign="center" w="1400px" maxW="100%" mx="auto">
          <Center gap="4">
            <Heading color={isSuccess ? 'green.400' : 'red.400'}>
              {isSuccess
                ? 'Email confirmado com sucesso!'
                : 'Token inválido ou expirado'}
            </Heading>
            {isSuccess ? (
              <Icon as={HandsClapping} color="green.400" fontSize="3xl" />
            ) : (
              <Icon as={MaskSad} color="red.400" fontSize="3xl" />
            )}
          </Center>
          <Text>
            {isSuccess
              ? 'Agora é só esperar, caso você seja selecionado para participar da pesquisa, iremos retornar através email.'
              : 'O token para de confirmação de email está expirado ou incorreto verifique o link enviado para seu email novamente ou entre em contato com a equipe do projeto através do ícone de envelope no canto inferior direito do site.'}
          </Text>
        </Stack>
      </Center>
      <ContactWidget />
    </>
  )
}
