import { Center, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { textGradientWithDir } from '../../../styles/global'
import { generateContainer, item } from '../../../utils/chainedAnimation'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const Motivation = () => {
  const container = generateContainer()
  const itemToRight = item('to-right')
  const itemToLeft = item('to-left')
  return (
    <Flex
      position="relative"
      textAlign={['center', 'left']}
      mt={'60!'}
      minH="80vh"
      w="1500px"
      maxW="full"
      px="6"
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
          <Heading as={motion.h1} variants={itemToRight}>
            Nossa motivação
          </Heading>
          <Stack spacing="1rem" as={motion.div} variants={itemToRight}>
            <Text>
              A divulgação científica sempre foi um problema para a comunidade
              de pesquisadores e cientistas, encontrar uma maneira de divulgar
              seu trabalho para muitas pessoas independente do seu nicho e
              conhecimento técnico, é muito desafiador. Umas pessoas preferem a{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={textGradientWithDir()}
                bgClip="text"
              >
                leitura
              </Text>
              , outras os
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={textGradientWithDir()}
                bgClip="text"
              >
                {' '}
                vídeos
              </Text>
              , outras{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={textGradientWithDir()}
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
                bgGradient={textGradientWithDir()}
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
          variants={itemToLeft}
          as={motion.div}
          minH="400px"
        >
          <ChakraCustomImage
            flex="1"
            width={600}
            height={400}
            src="/images/readbooks.svg"
            alt="Pessoa com ícones de mídias sociais ao redor"
          />
        </Center>
      </Grid>
    </Flex>
  )
}
