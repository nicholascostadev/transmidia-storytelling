import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { CaretDown } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import Typed from 'react-typed'

import monkeypoxImg from '../../../assets/cientista.png'
import overweightImg from '../../../assets/obesidade.jpg'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const Hero = () => {
  const [showing, setShowing] = useState(true)
  const textRef = useRef<string>() as any
  const textColor = useColorModeValue('gray.500', 'white')
  const heroRef = useRef(null)
  const isInView = useInView(heroRef)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('RODOU')
      if (textRef.current?.typed.arrayPos === 0) {
        setShowing(true)
      } else {
        setShowing(false)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [showing])

  return (
    <Flex
      position="relative"
      w="1500px"
      mx="auto"
      maxW="full"
      display="flex"
      justifyContent="center"
      h="140vh"
    >
      <Stack
        mt="6rem"
        textAlign={'center'}
        w="full"
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Box
          as={motion.div}
          w="full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          }}
        >
          <Flex
            justify="start"
            alignItems="center"
            w="1100px"
            maxW="full"
            mx="auto"
          >
            <Heading
              fontWeight="bold"
              fontSize={{ base: '3xl', sm: '4xl', md: '8xl' }}
              transition="all 1s ease"
              lineHeight={'110%'}
              textAlign="left"
              pl="10"
              ref={heroRef}
              fontFamily="'Passion One'"
              flex="1"
            >
              O que ninguém te contou
              <Heading
                as={Typed}
                bgGradient="linear(to-r, pink.400, purple.600)"
                bgClip="text"
                strings={['...', '...']}
                showCursor={false}
                typeSpeed={110}
                fontFamily="'Nunito', sans-serif"
                startDelay={450}
                fontWeight="extrabold"
                backSpeed={70}
                loop
                fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }}
              ></Heading>
            </Heading>
          </Flex>
          <Heading
            as={Typed}
            bgGradient="linear(to-r, pink.400, purple.600)"
            bgClip="text"
            ref={textRef}
            strings={['Varíola dos Macacos?', 'Obesidade?']}
            backDelay={2000}
            typeSpeed={40}
            fontFamily="'Nunito', sans-serif"
            startDelay={450}
            fontWeight="extrabold"
            backSpeed={70}
            loop
            fontSize={{ base: '2xl', sm: '3xl', md: '8xl' }}
          ></Heading>
        </Box>
        <Text
          as={motion.p}
          textColor={textColor}
          maxW="3xl"
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 1.65,
            },
          }}
          initial={{ opacity: 0, scale: 0.8 }}
        >
          A divulgação científica é muito importante para toda a humanidade.
          Espalhar conhecimento foi o que nos fez capaz de chegar onde estamos
          hoje, mas como fazer com que o conteúdo chegue a todos e com uma forma
          compreensível para cada tipo de pessoa?
        </Text>
        <Flex w={'full'} justify="center" alignItems="center" pt="10">
          <Box height={{ sm: '24rem', lg: '28rem' }}>
            {showing && (
              <motion.div
                animate={{
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              >
                <ChakraCustomImage
                  src={monkeypoxImg}
                  alt=""
                  maxH="300px"
                  width={700}
                  height={700}
                  sx={{
                    borderRadius: '99999px',
                  }}
                  objectFit="cover"
                  rounded="full"
                />
              </motion.div>
            )}
            {!showing && (
              <motion.div
                animate={{
                  opacity: [0, 1],
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              >
                <ChakraCustomImage
                  src={overweightImg}
                  alt=""
                  maxH="300px"
                  width={700}
                  height={700}
                  sx={{
                    borderRadius: '99999px',
                  }}
                  objectFit="cover"
                  rounded="full"
                />
              </motion.div>
            )}
          </Box>
        </Flex>
      </Stack>
      <motion.div
        animate={{
          y: [0, -20],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={
          isInView
            ? {
                position: 'fixed',
                right: '5%',
                bottom: 0,
              }
            : {
                display: 'none',
              }
        }
      >
        <IconButton
          as="a"
          href="#explanation"
          icon={<CaretDown size={30} />}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
          aria-label="Go to next section"
        />
      </motion.div>
    </Flex>
  )
}
