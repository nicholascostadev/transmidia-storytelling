import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  IconButton,
  Link as ChakraLink,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { CaretLeft, Moon, SignOut, Sun, List } from 'phosphor-react'

export default function NotAllowed() {
  const { data: userSession } = useSession()
  const { toggleColorMode: toggleMode } = useColorMode()
  const SwitchIcon = useColorModeValue(Moon, Sun)
  const text = useColorModeValue('dark', 'light')

  return (
    <>
      <Head>
        <title>TST | Obrigado!</title>
      </Head>
      <Box pos="relative">
        <chakra.header
          shadow="sm"
          transition="box-shadow 0.2s"
          borderTopColor="brand.400"
          w="full"
          overflowY="hidden"
        >
          <chakra.div h="4.5rem" mx="auto" maxW="1200px">
            <>
              <Flex
                p={['6', '0']}
                w="full"
                h="full"
                align="center"
                justify="space-between"
              >
                <Flex align="center">
                  <Link href="/" passHref>
                    <Heading as={'a'} size={'md'}>
                      Transmídia StoryTelling
                    </Heading>
                  </Link>
                </Flex>

                <Flex
                  gap="2"
                  justify="flex-end"
                  w="full"
                  maxW="824px"
                  align="center"
                  color="gray.400"
                >
                  <IconButton
                    size="md"
                    fontSize="lg"
                    aria-label={`Switch to ${text} mode`}
                    variant="ghost"
                    color="current"
                    ml={{
                      base: '0',
                      md: '3',
                    }}
                    onClick={toggleMode}
                    icon={<SwitchIcon />}
                  />
                  {userSession && (
                    <Button
                      rightIcon={<SignOut />}
                      colorScheme="purple"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  )}
                  {!userSession && (
                    <Link href="/admin" passHref>
                      <Button as="a" variant="ghost" colorScheme="purple">
                        Sign In
                      </Button>
                    </Link>
                  )}
                  <IconButton
                    aria-label={'Open menu'}
                    display={{
                      base: 'flex',
                      md: 'none',
                    }}
                    icon={<List />}
                  />
                </Flex>
              </Flex>
            </>
          </chakra.div>
        </chakra.header>
      </Box>
      <Center h="calc(100vh - 72px)" textAlign="center">
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="1400px"
          maxW="full"
          mx="auto"
        >
          <Text fontSize={['2xl', '2xl', '3xl']} color="green.400">
            Muito obrigado por fazer a diferença na divulgação científica
          </Text>
          <Text fontSize={['sm', 'lg', 'xl']}>
            Você receberá um e-mail de confirmação em breve. Se você não
            receber, verifique sua caixa de spam. Se você não receber o e-mail
            de confirmação, entre em contato com a equipe do projeto.
          </Text>
          <Link href="/" passHref>
            <ChakraLink
              display="flex"
              justifyContent="start"
              alignItems="center"
              _hover={{
                color: 'green.500',
              }}
            >
              <CaretLeft /> Voltar à página inicial
            </ChakraLink>
          </Link>
        </Stack>
      </Center>
    </>
  )
}
