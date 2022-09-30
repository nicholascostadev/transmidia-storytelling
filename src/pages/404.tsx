import {
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  IconButton,
  Link as ChakraLink,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { CaretLeft, Moon, Sun } from 'phosphor-react'

export default function NotAllowed() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const SwitchIcon = useColorModeValue(Moon, Sun)
  const text = useColorModeValue('dark', 'light')

  return (
    <>
      <Head>
        <title>404 | Not Found</title>
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
                </Flex>
              </Flex>
            </>
          </chakra.div>
        </chakra.header>
      </Box>
      <Center h="calc(100vh - 72px)">
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Heading fontSize="5xl">404 - Página não encontrada</Heading>
          <Link href="/" passHref>
            <ChakraLink
              display="flex"
              justifyContent="start"
              alignItems="center"
              _hover={{
                color: 'gray.400',
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
