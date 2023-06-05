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
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import NextLink from 'next/link'
import { CaretDown, CaretRight } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import Typed from 'react-typed'

import { textGradientWithDir } from '../../../styles/global'

const images = ['/images/cientista.jpg', '/images/obesidade.jpg']
const totalImages = images.length
const duration = [3, 2]

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(1)
  const textRef = useRef<string>() as any
  const textColor = useColorModeValue('black', 'white')
  const heroRef = useRef(null)
  const isInView = useInView(heroRef)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(textRef.current?.typed.arrayPos + 1)

      if (textRef.current?.typed.arrayPos + 1 > totalImages) {
        setCurrentImage(1)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

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
              fontSize={{ base: '3xl', sm: '6xl', md: '8xl' }}
              transition="all 1s ease"
              lineHeight={'110%'}
              textAlign={['center', 'center']}
              pl={['0', '10']}
              ref={heroRef}
              fontFamily="'Passion One'"
              flex="1"
            >
              O que ninguém te contou
              <Heading
                bgGradient={textGradientWithDir()}
                as="span"
                bgClip="text"
                fontFamily="'Nunito', sans-serif"
                fontWeight="extrabold"
                fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }}
              >
                ...
              </Heading>
            </Heading>
          </Flex>
          <Heading
            as={Typed}
            bgGradient={textGradientWithDir()}
            bgClip="text"
            ref={textRef}
            strings={['Canabidiol?', 'Obesidade?']}
            backDelay={2000}
            typeSpeed={40}
            fontFamily="'Nunito', sans-serif"
            startDelay={450}
            fontWeight="extrabold"
            backSpeed={70}
            loop
            fontSize={{ base: '4xl', sm: '6xl', md: '8xl' }}
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
            <Link
              as={NextLink}
              href="https://docs.google.com/forms/d/e/1FAIpQLSfBo8-HhD5rPZZ6l4vMisPyZh52ANfDYhroCNM8t_2l8evtGA/viewform?usp=sharing"
              target="_blank"
              rel="noreferrer"
              fontWeight="bold"
              bgGradient={textGradientWithDir()}
              bgClip="text"
            >
              Participe{' '}
            </Link>
            e faça a diferença.
          </Text>
          <Flex justify="center" alignItems="center">
            <LightMode>
              <motion.div
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 1.65,
                  },
                }}
                initial={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  as={NextLink}
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfBo8-HhD5rPZZ6l4vMisPyZh52ANfDYhroCNM8t_2l8evtGA/viewform?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  colorScheme="pink"
                  maxW="xs"
                  size="lg"
                  rightIcon={<CaretRight size={24} />}
                >
                  Participar
                </Button>
              </motion.div>
            </LightMode>
          </Flex>
        </Stack>
        <Flex w={'full'} justify="center" alignItems="center" pt="2">
          <Box>
            {images.map((image, i) => {
              if (i === currentImage - 1)
                return (
                  <motion.div
                    key={image}
                    animate={{
                      opacity: [0, 1],
                    }}
                    transition={{
                      duration: duration[i],
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'mirror',
                    }}
                    style={{
                      display: i === currentImage - 1 ? 'block' : 'none',
                    }}
                  >
                    <Image
                      src={images[i] as string}
                      alt={
                        i === 0
                          ? 'Ilustração de um cientista'
                          : 'Ilustração de uma pessoa obesa'
                      }
                      width={700}
                      height={700}
                      style={{
                        borderRadius: '9999999px',
                        objectFit: 'cover',
                      }}
                    />
                  </motion.div>
                )

              return null
            })}
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
