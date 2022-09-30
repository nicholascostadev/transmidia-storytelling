import {
  Box,
  Button,
  ButtonGroup,
  Center,
  chakra,
  DarkMode,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { DashboardMobileNavContent } from './DashboardMobileNavContent'
import NextLink from 'next/link'
import { Sun, Moon, List } from 'phosphor-react'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const DashboardHeader = ({
  hasPermission,
}: {
  hasPermission: boolean
}) => {
  const mobileNav = useDisclosure()
  const { data: userSession } = useSession()
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const textColor = useColorModeValue('gray.600', '')
  const backgroundColor = useColorModeValue('white', 'gray.900')
  const shadow = useColorModeValue('sm', 'none')
  const SwitchIcon = useColorModeValue(Moon, Sun)

  return (
    <Box pos="relative">
      <chakra.header
        shadow={shadow}
        bg={backgroundColor}
        transition="box-shadow 0.2s"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div
          h="4.5rem"
          p={['6', '0']}
          mx="auto"
          display="flex"
          maxW="1200px"
          alignItems="center"
          justifyContent="space-between"
        >
          <>
            <Flex
              h="full"
              align="center"
              justify="space-between"
              w="1200px"
              maxW="full"
              mx="auto"
            >
              <Flex>
                <NextLink href="/" passHref>
                  <Heading
                    as={'a'}
                    fontSize={['sm', 'sm', 'md', 'xl']}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap="2"
                  >
                    Transmídia StoryTelling
                    <Box>
                      <ChakraCustomImage
                        lineHeight={0}
                        src="/images/healthlab-logo.png"
                        alt=""
                        layout="fixed"
                        height={35}
                        width={30}
                      />
                    </Box>
                  </Heading>
                </NextLink>
              </Flex>
            </Flex>

            {hasPermission && (
              <HStack
                gap="2"
                justify="flex-end"
                w="full"
                maxW="824px"
                align="center"
                color="gray.400"
              >
                <ButtonGroup
                  color={textColor}
                  variant="ghost"
                  spacing="6"
                  display={['none', 'none', 'flex']}
                >
                  <NextLink href="/admin/dashboard" passHref>
                    <Button as="a">Dashboard</Button>
                  </NextLink>
                  <NextLink href="/admin/manageusers" passHref>
                    <Button as="a">Gerenciar</Button>
                  </NextLink>
                  <Center>
                    <Divider orientation="vertical" h="35px" />
                  </Center>
                </ButtonGroup>

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
                <IconButton
                  aria-label={'Open menu'}
                  display={{
                    base: 'flex',
                    md: 'none',
                  }}
                  icon={<List />}
                  onClick={mobileNav.onOpen}
                />
                {userSession && (
                  <DarkMode>
                    <Button
                      display={['none', 'none', 'flex']}
                      colorScheme="pink"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </DarkMode>
                )}
              </HStack>
            )}
            {!hasPermission && userSession && (
              <HStack>
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
                <DarkMode>
                  <Button colorScheme="pink" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </DarkMode>
              </HStack>
            )}
            {!hasPermission && !userSession && (
              <HStack>
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
              </HStack>
            )}
            <DashboardMobileNavContent
              hasPermission={hasPermission}
              mobileNav={mobileNav}
            />
          </>
        </chakra.div>
      </chakra.header>
    </Box>
  )
}
