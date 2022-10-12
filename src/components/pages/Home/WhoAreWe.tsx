import { Avatar, Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { generateContainer, item } from '../../../utils/chainedAnimation'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const WhoAreWe = () => {
  const container = generateContainer(0)
  const itemToRight = item('to-right')
  const itemToLeft = item('to-left')

  return (
    <Flex
      bgColor="ibmr.800"
      color="white"
      id="team"
      minH="80vh"
      justify="center"
      alignItems="center"
      pos="relative"
      pt={['40', '40', '20']}
      pb={['10', '10', '20']}
      textAlign={['center', 'center', 'left']}
    >
      <motion.div
        whileInView={{
          top: [240, 240 + Math.floor(Math.random() * 30)],
          right: [160, 200],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          position: 'absolute',
          opacity: 0.8,
          top: 240,
          right: 160,
          zIndex: 0,
          margin: '0 auto',
        }}
      >
        <ChakraCustomImage
          display={['none', 'none', 'initial']}
          src="/images/virus.svg"
          alt=""
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        whileInView={{
          top: [20, Math.floor(Math.random() * 120)],
          left: [160, 120],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          position: 'absolute',
          opacity: 0.8,
          top: 0,
          left: 160,
          zIndex: 0,
        }}
      >
        <ChakraCustomImage
          src="/images/science1.svg"
          display={['none', 'none', 'initial']}
          alt=""
          width={200}
          height={200}
        />
      </motion.div>
      <motion.div
        whileInView={{
          bottom: [0, Math.floor(Math.random() * 30)],
          left: [160, 200],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          position: 'absolute',
          opacity: 0.8,
          bottom: 0,
          left: 160,
          zIndex: 0,
        }}
      >
        <ChakraCustomImage
          src="/images/science2.svg"
          display={['none', 'none', 'initial']}
          alt=""
          width={200}
          height={200}
        />
      </motion.div>
      <Flex
        flexDirection="column"
        gap="20"
        w="1300px"
        maxW="full"
        mx="auto"
        zIndex={100}
      >
        <Heading
          as={motion.h1}
          textAlign="center"
          fontSize={['3xl', '7xl']}
          mb="16"
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          initial={{ opacity: 0, scale: 0.6, transitionDuration: '1.2s' }}
          viewport={{ once: true }}
        >
          Nossa Equipe
        </Heading>
        <Grid
          templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
          maxW="80%"
          mx="auto"
        >
          <Stack
            as={motion.div}
            variants={container}
            spacing={['4', '4', '10']}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            direction="row"
            justify="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              as={motion.div}
              variants={itemToRight}
            >
              <Avatar size="2xl" />
              <Text textAlign="center">Luiz</Text>
              <Text fontSize="xs" textAlign="center" color="gray.200">
                Formado em ... pela ...
              </Text>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              as={motion.div}
              variants={itemToRight}
            >
              <Avatar size="2xl" />
              <Text textAlign="center">Raphael</Text>
              <Text fontSize="xs" textAlign="center" color="gray.200">
                Formado em ... pela ...
              </Text>
            </Box>
          </Stack>
          <Stack
            as={motion.div}
            initial={{
              opacity: 0,
              scale: 0.8,
              transitionDuration: '0.75s',
              transitionDelay: '1.5s',
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
          >
            <Heading>Orientadores</Heading>
            <Text>
              Um time de orientadores extraordinários, com formações diversas
              nas áreas de ciência, que irão realizar conosco nosso sonho de
              divulgar ciência acessível à todos.
            </Text>
          </Stack>
        </Grid>
        <Grid
          gap="10"
          templateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
          maxW="80%"
          mx="auto"
        >
          <Stack
            as={motion.div}
            initial={{
              scale: 0.8,
              opacity: 0,
              transitionDuration: '0.75s',
              transitionDelay: '1.2s',
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
          >
            <Heading>Pesquisadores</Heading>
            <Text>
              Um time de 8 pesquisadores extraordinários, não com apenas a
              ambição de aprender, mas sim de mudar o mundo para melhor. Esse é
              o primeiro passo para realizarmos nosso sonho.
            </Text>
          </Stack>
          <Flex
            as={motion.div}
            gap="10px"
            variants={container}
            direction={['column', 'column', 'row']}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Stack
              as={motion.div}
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              variants={itemToLeft}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Gabrielle</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Gabriela</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
            </Stack>
            <Stack
              as={motion.div}
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              variants={itemToLeft}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar
                  size="2xl"
                  src="https://github.com/nicholascostadev.png"
                />
                <Text textAlign="center">Nicholas Costa</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de Ciência da Computação
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Ursula</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
            </Stack>
            <Stack
              as={motion.div}
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              variants={itemToLeft}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Karen Miranda</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Daniel</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
            </Stack>
            <Stack
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              as={motion.div}
              variants={itemToLeft}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Juliana</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" />
                <Text textAlign="center">Luísa</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Estudante de ...
                </Text>
              </Box>
            </Stack>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
}
