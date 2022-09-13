import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import { signOut } from 'next-auth/react'
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MobileNavContent } from './MobileNavContent'

export const DashboardHeader = () => {
  const mobileNav = useDisclosure()
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const ref = useRef(null)
  const [y, setY] = useState(0)
  // @ts-ignore
  const height = ref.current ? ref.current.getBoundingClientRect() : 0
  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
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
                <NextLink href="/" passHref>
                  <Heading as={'a'} size={'md'}>
                    Transmídia StoryTelling
                  </Heading>
                </NextLink>
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
                <Button colorScheme="purple" onClick={() => signOut()}>
                  Sign Out
                </Button>
                <IconButton
                  aria-label={'Open menu'}
                  display={{
                    base: 'flex',
                    md: 'none',
                  }}
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                />
              </Flex>
            </Flex>
            <MobileNavContent mobileNav={mobileNav} />
          </>
        </chakra.div>
      </chakra.header>
    </Box>
  )
}
