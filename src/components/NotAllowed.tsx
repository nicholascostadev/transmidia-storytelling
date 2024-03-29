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
import { CaretLeft, CaretRight, List, Moon, SignOut, Sun } from 'phosphor-react'
export const NotAllowed = ({ isModerator }: { isModerator: boolean }) => {
  const { data: userSession } = useSession()
  const { toggleColorMode: toggleMode } = useColorMode()
  const SwitchIcon = useColorModeValue(Moon, Sun)
  const text = useColorModeValue('dark', 'light')

  return (
    <>
      <Head>
        <title>Not Allowed</title>
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
                  <Heading as={Link} href="/" size={'md'}>
                    Transmídia StoryTelling
                  </Heading>
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
                    <Button
                      as={Link}
                      href="/admin"
                      variant="ghost"
                      colorScheme="purple"
                    >
                      Sign In
                    </Button>
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
      <Center h="calc(100vh - 72px)">
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="xl" color="red.400">
            Você não tem permissões para acessar essa página
          </Text>
          {isModerator ? (
            <ChakraLink
              as={Link}
              href="/admin/dashboard"
              display="flex"
              justifyContent="start"
              alignItems="center"
              _hover={{
                color: 'purple.400',
              }}
            >
              Ir para o Dashboard <CaretRight />
            </ChakraLink>
          ) : (
            <ChakraLink
              as={Link}
              href="/"
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <CaretLeft /> Voltar à página inicial
            </ChakraLink>
          )}
        </Stack>
      </Center>
    </>
  )
}
