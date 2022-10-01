import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ContactWidget } from '../../components/ContactWidget'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'

export default function ConfirmEmail() {
  const [text, setText] = useState('')
  const { query } = useRouter()
  const { token } = query
  trpc.useQuery(
    [
      'emailRouter.confirmEmail',
      {
        token: String(token),
      },
    ],
    {
      onSuccess: (data) => {
        console.log({ data })
        setText('Email confirmado com sucesso!')
      },
      onError: (err) => {
        console.log({ err })
        setText('Token inválido ou expirado')
      },
      staleTime: Infinity,
    },
  )

  return (
    <>
      <Head>
        <title>TST | Confirmado</title>
      </Head>
      <Header />
      <Center h="calc(100vh - 72px)">
        <Stack textAlign="center">
          <Heading color="green.400">{text}</Heading>
          <Text>
            Agora é só esperar, assim que tivermos a resposta sobre a sua
            aprovação ou não para a pesquisa, iremos retornar através do seu
            Whatsapp e email.
          </Text>
          <Text>
            {/* TODO: Add widget for contact */}
            Caso tenha algum problema relacionado a seu cadastro, entre em
            contato conosco por ...
          </Text>
        </Stack>
      </Center>
      <ContactWidget />
    </>
  )
}
