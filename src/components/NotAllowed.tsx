import Head from 'next/head'
import { Center, Stack, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import { CaretLeft } from 'phosphor-react'
export const NotAllowed = () => {
  return (
    <>
      <Head>
        <title>Not Allowed</title>
      </Head>
      <Center h="100vh">
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="xl" color="red.400">
            Você não tem permissões para acessar essa página
          </Text>
          <Link href="/" passHref>
            <ChakraLink
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <CaretLeft /> Voltar à página inicial
            </ChakraLink>
          </Link>
        </Stack>
      </Center>
    </>
  )
}
