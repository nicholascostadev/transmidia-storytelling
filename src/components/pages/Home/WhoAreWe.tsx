import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Info } from 'phosphor-react'
import { generateContainer, item } from '../../../utils/chainedAnimation'
import { ChakraCustomImage } from '../../ChakraCustomImage'

const teamImagesDir = '/images/teamImages'

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
        w="1900px"
        maxW="full"
        mx="auto"
        zIndex={100}
      >
        <Heading
          as={motion.h1}
          textAlign="center"
          fontSize={['3xl', '7xl']}
          mb={['0', '0', '16']}
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
            alignItems="start"
          >
            <Stack
              display="flex"
              flex="1"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              as={motion.div}
              variants={itemToRight}
            >
              <Avatar size="2xl" src={`${teamImagesDir}/luiz.jpeg`} />
              <Box>
                <Text textAlign="center">
                  Luiz Guilherme Hendrischky, Ph.D.
                </Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Biomédico, Especialista em Hematologia e Doutor em Ciências
                  Médicas (Neurociências). Atualmente é Professor e Pesquisador
                  do Centro Universitário IBMR.
                </Text>
              </Box>
            </Stack>
            <Stack
              justifyContent="center"
              display="flex"
              flex="1"
              alignItems="center"
              flexDir="column"
              as={motion.div}
              variants={itemToRight}
            >
              <Avatar size="2xl" src={`${teamImagesDir}/raphael.jpeg`} />
              <Box>
                <Text textAlign="center">Raphael</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Biomédico, habilitado em imunologia, saúde pública e
                  virologia. Mba em liderança, inovação e gestao 4.0 PUC. Mestre
                  em ciências biomédicas. Coordenador e professor no Centro
                  Universitário Ibmr.
                </Text>
              </Box>
            </Stack>
          </Stack>
          <Stack
            as={motion.div}
            mt={['16', '0', '0']}
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
              Um time de 10 pesquisadores extraordinários, não com apenas a
              ambição de aprender, mas sim de mudar o mundo para melhor. Esse é
              o primeiro passo para realizarmos nosso sonho.
            </Text>
          </Stack>
          <Flex
            as={motion.div}
            gap="10px"
            variants={container}
            direction={['column', 'column', 'row']}
            alignItems="flex-start"
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
              h="full"
              flex="1"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/gabiSoares.jpg`} />
                <Text textAlign="center">Gabrielle Soares</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Biomedicina.
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/gabiOliveira.jpg`} />
                <Text textAlign="center">Gabriela Oliveira</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Biomedicina.
                </Text>
              </Box>
            </Stack>
            <Stack
              as={motion.div}
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              alignItems={['start', 'start', 'center']}
              spacing={['4', '4', '10']}
              variants={itemToLeft}
              h="full"
              w="full"
              flex="1"
              mt={['0', '0', '2']}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/nicholas.jpeg`} />
                <Text textAlign="center">Nicholas Costa</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Ciência da Computação.
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/ursula.jpeg`} />
                <Flex alignItems="center" gap="1">
                  <Text textAlign="center">Ursula</Text>
                  <Tooltip
                    label="Especialista em marketing e gestão de negócios, cursando Biomedicina."
                    hasArrow
                    rounded="md"
                  >
                    <span>
                      <Info size={20} />
                    </span>
                  </Tooltip>
                </Flex>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Formada em Marketing e cursando Biomedicina.
                </Text>
              </Box>
            </Stack>
            <Stack
              as={motion.div}
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              variants={itemToLeft}
              h="full"
              w="full"
              flex="1"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/karen.jpeg`} />
                <Text textAlign="center">Karen Miranda</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Biomedicina.
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/danielG.jpeg`} />
                <Text textAlign="center">Daniel Gullo</Text>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Biomedicina.
                </Text>
              </Box>
            </Stack>
            <Stack
              direction={['row', 'row', 'column']}
              justify={['center', 'center', 'start']}
              spacing={['4', '4', '10']}
              as={motion.div}
              variants={itemToLeft}
              h="full"
              w="full"
              flex="1"
              mt="2"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/stephanie.jpeg`} />
                <Flex alignItems="center" gap="1">
                  <Text textAlign="center">Stêphanie Elaxias</Text>
                  <Tooltip
                    rounded="md"
                    label="Cursando Biomedicina, formada em Letras PT/Espanhol."
                  >
                    <span>
                      <Info size={20} />
                    </span>
                  </Tooltip>
                </Flex>
                <Text fontSize="xs" textAlign="center" color="gray.200">
                  Cursando Biomedicina e formada em Letras.
                </Text>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                flex="1"
              >
                <Avatar size="2xl" src={`${teamImagesDir}/luisa.jpg`} />
                <Text textAlign="center">Luísa Cascardo</Text>
                <Stack>
                  <Text fontSize="xs" textAlign="center" color="gray.200">
                    Cursando Biomedicina e Biologia.
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  )
}
