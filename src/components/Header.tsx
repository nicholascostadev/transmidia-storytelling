import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { CaretRight, Moon, Sun } from 'phosphor-react'
import { MdOutlineReadMore } from 'react-icons/md'
import { ChakraCustomImage } from './ChakraCustomImage'
import { MobileNavContent } from './MobileNavContent'

export const Header = () => {
  const mobileNav = useDisclosure()
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const shadow = useColorModeValue('md', 'none')
  const SwitchIcon = useColorModeValue(Moon, Sun)

  const SponsorButton = (
    <LightMode>
      <NextLink href={'/participate'} passHref>
        <Button
          display={{
            md: 'flex',
          }}
          alignItems="center"
          transition="all 0.3s"
          colorScheme={'pink'}
          rightIcon={
            <motion.div
              animate={{
                x: [0, 5],
              }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              <CaretRight size={24} />
            </motion.div>
          }
          size={'md'}
        >
          Participar
        </Button>
      </NextLink>
    </LightMode>
  )

  return (
    <Box
      pos="relative"
      position="fixed"
      mx="auto"
      zIndex="2"
      w="100vw"
      maxW="100%"
      bg={useColorModeValue('white', 'gray.900')}
    >
      <chakra.header
        shadow={shadow}
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
                        src="/healthlab-logo.svg"
                        layout="fixed"
                        height={35}
                        width={30}
                      />
                    </Box>
                  </Heading>
                </NextLink>
              </Flex>
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
            </Flex>
            <MobileNavContent mobileNav={mobileNav} />
          </>
        </chakra.div>
      </chakra.header>
    </Box>
  )
}
