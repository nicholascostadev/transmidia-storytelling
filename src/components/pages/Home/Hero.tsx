import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  LightMode,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { motion, useInView } from 'framer-motion'
import { CaretDown, CaretRight } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import Typed from 'react-typed'

import monkeypoxImg from '../../../assets/cientista.png'
import overweightImg from '../../../assets/obesidade.jpg'
import { defaultGradient } from '../../../styles/global'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const Hero = () => {
  const [showing, setShowing] = useState(true)
  const textRef = useRef<string>() as any
  const textColor = useColorModeValue('black', 'white')
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
      px={['6', '0']}
      w="1500px"
      mx="auto"
      maxW="full"
      display="flex"
      justifyContent="center"
      minH="100vh"
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
                bgGradient={defaultGradient}
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
            bgGradient={defaultGradient}
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
        <Stack spacing="1.5rem">
          <Text
            as={motion.p}
            textColor={textColor}
            maxW="50rem"
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                delay: 1.65,
              },
            }}
            initial={{ opacity: 0, scale: 0.8 }}
          >
            Sim, tudo isso está por ai, mas talvez você não esteja vendo.
            Futebol, basquete, volei, televisão, redes sociais, tudo tirando a
            atenção dos problemas que nunca sumiram, e será que algum dia irão
            sumir?
          </Text>
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
            A ciência é complexa, sim, nós sabemos, mas como fazer com que um
            conteúdo complexo seja possível ser compreendido por todos? qual
            linguagem usar? qual mídia? Isso que iremos responder. Sua
            participação na pesquisa é crucial para conseguirmos entender cada
            pessoa de forma única.{' '}
            <NextLink href="/participate" passHref>
              <Text
                as={Link}
                fontWeight="bold"
                bgGradient={defaultGradient}
                bgClip="text"
              >
                Participe
              </Text>
            </NextLink>{' '}
            e faça a diferença.
          </Text>
          <Flex justify="center" alignItems="center">
            <LightMode>
              <NextLink href="/participate" passHref>
                <Button
                  as={motion.a}
                  colorScheme="pink"
                  maxW="xs"
                  size="lg"
                  rightIcon={<CaretRight size={24} />}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 1.65,
                    },
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                >
                  Participar
                </Button>
              </NextLink>
            </LightMode>
          </Flex>
        </Stack>
        <Flex w={'full'} justify="center" alignItems="center" pt="2">
          <Box>
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
          duration: 1,
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
          icon={<CaretDown size={50} />}
          variant="unstyled"
          colorScheme="purple"
          size="lg"
          aria-label="Go to next section"
        />
      </motion.div>
    </Flex>
  )
}
