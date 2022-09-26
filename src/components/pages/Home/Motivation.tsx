import { Center, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { defaultGradientInv } from '../../../styles/global'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const Motivation = () => {
  const container = {
    hidden: { opacity: 0, transitionDuration: '2s' },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = (direction: 'to-right' | 'to-left') => {
    if (direction === 'to-left') {
      return {
        hidden: { opacity: 0, x: '200px', transitionDuration: '2s' },
        show: { opacity: 1, x: 0 },
      }
    }

    return {
      hidden: { opacity: 0, x: '-400px', transitionDuration: '2s' },
      show: { opacity: 1, x: 0 },
    }
  }
  return (
    <Flex
      position="relative"
      textAlign={['center', 'left']}
      mt={'60!'}
      minH="80vh"
      maxW="1200px"
      px={['6', '0']}
      mx="auto"
      align="start"
      justify="center"
    >
      <Grid
        gap={['0', '10']}
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
        maxW={'100%'}
        minH="400px"
        as={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Stack
          as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          flex="1"
          spacing="1rem"
          viewport={{ once: true }}
        >
          <Heading as={motion.h1} variants={item('to-right')}>
            Nossa motivação
          </Heading>
          <Stack spacing="1rem" as={motion.div} variants={item('to-right')}>
            <Text>
              A divulgação científica sempre foi um problema para a comunidade
              de pesquisadores e cientistas, encontrar uma maneira de divulgar
              seu trabalho para muitas pessoas independente do seu nicho e
              conhecimento técnico, é muito desafiador. Umas pessoas preferem a{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                leitura
              </Text>
              , outras os
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                {' '}
                vídeos
              </Text>
              , outras{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                podcasts{' '}
              </Text>
              e muitas outras diversas maneiras.
            </Text>
            <Text>
              Através do{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                Transmídia Storytelling
              </Text>
              , permitimos uma nova maneira de ajudar todos divulgadores de
              ciência a espalhar seu conhecimento de forma compreensiva e
              conseguir encontrar o público junto com a mídia certa de forma
              compreensiva.
            </Text>
          </Stack>
        </Stack>
        <Center
          alignItems="center"
          justifyContent="center"
          variants={item('to-left')}
          as={motion.div}
          minH="400px"
        >
          <ChakraCustomImage
            flex="1"
            width={600}
            height={400}
            src="/images/readbooks.svg"
            alt="Person with social media icons around"
          />
        </Center>
      </Grid>
    </Flex>
  )
}
