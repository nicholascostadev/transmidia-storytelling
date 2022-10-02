import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ContactWidget } from '../../components/ContactWidget'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'

export default function ConfirmEmail() {
  const { query } = useRouter()
  const { token } = query
  const { isSuccess } = trpc.useQuery([
    'emailRouter.confirmEmail',
    {
      token: String(token),
    },
  ])

  return (
    <>
      <Head>
        <title>TST | Confirmado</title>
      </Head>
      <Header />
      <Center h="calc(100vh - 72px)">
        <Stack textAlign="center" w="1400px" maxW="100%" mx="auto">
          <Heading color="green.400">
            {isSuccess
              ? 'Email confirmado com sucesso!'
              : 'Token inválido ou expirado'}
          </Heading>
          <Text>
            {isSuccess
              ? 'Agora é só esperar, assim que tivermos a resposta sobre a sua aprovação ou não para a pesquisa, iremos retornar através do seu Whatsapp e email.'
              : 'O token para de confirmação de email está expirado ou incorreto, verifique o link enviado para seu email novamente ou entre em contato com a equipe do projeto através do icone de envelope no canto inferior direito do site.'}
          </Text>
        </Stack>
      </Center>
      <ContactWidget />
    </>
  )
}
