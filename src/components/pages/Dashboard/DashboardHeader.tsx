import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  DarkMode,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { DashboardMobileNavContent } from './DashboardMobileNavContent'
import { trpc } from '../../../utils/trpc'
import Link from 'next/link'
import { Sun, Moon } from 'phosphor-react'

export const DashboardHeader = ({
  hasPermission,
}: {
  hasPermission: boolean
}) => {
  const mobileNav = useDisclosure()
  const { data: userSession } = useSession()
  const { data } = trpc.useQuery(
    ['user.getUserInfo', { id: String(userSession?.user?.id) }],
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    },
  )
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const textColor = useColorModeValue('gray.600', '')
  const shadow = useColorModeValue('sm', 'none')
  const SwitchIcon = useColorModeValue(Moon, Sun)

  return (
    <Box pos="relative">
      <chakra.header
        shadow={shadow}
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
              {hasPermission && (
                <HStack
                  gap="2"
                  justify="flex-end"
                  w="full"
                  maxW="824px"
                  align="center"
                  color="gray.400"
                >
                  <ButtonGroup color={textColor} variant="ghost" spacing="6">
                    <Link href="/admin/dashboard" passHref>
                      <Button as="a">Dashboard</Button>
                    </Link>
                    <Link href="/admin/manageusers" passHref>
                      <Button as="a">Gerenciar</Button>
                    </Link>
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
                    icon={<AiOutlineMenu />}
                    onClick={mobileNav.onOpen}
                  />
                  <DarkMode>
                    <Button colorScheme="pink" onClick={() => signOut()}>
                      Sign Out
                    </Button>
                  </DarkMode>
                </HStack>
              )}
              {!hasPermission && (
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
            </Flex>
            <DashboardMobileNavContent
              hasPermission={data?.permission === 'admin'}
              mobileNav={mobileNav}
            />
          </>
        </chakra.div>
      </chakra.header>
    </Box>
  )
}
