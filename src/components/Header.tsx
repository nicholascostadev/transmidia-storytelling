import {
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'
import { MobileNavContent } from './MobileNavContent'
import { MdOutlineReadMore } from 'react-icons/md'

export const Header = () => {
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

  const SponsorButton = (
    <NextLink href={'/participate'} passHref>
      <Button
        display={{
          base: 'none',
          md: 'flex',
        }}
        alignItems="center"
        transition="all 0.3s"
        colorScheme={'purple'}
        leftIcon={<MdOutlineReadMore />}
        size={'md'}
        bg={'purple.400'}
        _hover={{ bg: 'purple.500' }}
      >
        Participar
      </Button>
    </NextLink>
  )

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
                {SponsorButton}
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
