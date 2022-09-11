import {
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import readBooks from '../assets/readbooks.svg'
import NextImage from 'next/image'

export const Motivation = () => {
  return (
    <Flex
      position="relative"
      textAlign={['center', 'left']}
      p={'2'}
      minH="80vh"
      maxW="1200px"
      mx="auto"
      align="center"
      justify="center"
    >
      <Grid
        gap={['0', '10']}
        templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
        maxW={'100%'}
        minH="400px"
      >
        <Stack flex="1" spacing="1rem">
          <Heading>Nossa motivação</Heading>
          <Text>
            A divulgação científica sempre foi um problema para a comunidade de
            pesquisadores e cientistas, encontrar uma maneira de divulgar seu
            trabalho para muitas pessoas independente do seu nicho e
            conhecimento técnico, é muito desafiador. Umas pessoas preferem a{' '}
            <Text
              fontWeight="bold"
              as="span"
              bgGradient="linear(to-r, purple.400, purple.400, pink.400)"
              bgClip="text"
            >
              leitura
            </Text>
            , outras os
            <Text
              fontWeight="bold"
              as="span"
              bgGradient="linear(to-r, pink.400, purple.500, purple.500)"
              bgClip="text"
            >
              {' '}
              vídeos
            </Text>
            , outras{' '}
            <Text
              fontWeight="bold"
              as="span"
              bgGradient="linear(to-r, purple.500, purple.500, pink.400)"
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
              bgGradient="linear(to-r, purple.400, purple.400, pink.400)"
              bgClip="text"
            >
              Transmídia Storytelling
            </Text>
            , permitimos uma nova maneira de ajudar todos divulgadores de
            ciência em diferentes mídias a divulgar seu conhecimento de forma
            compreensiva e conseguir encontrar o público e mídia certos para o
            seu conteúdo.
          </Text>
        </Stack>
        <Center minH="400px">
          <Image
            as={NextImage}
            flex="1"
            w="400px"
            maxW={'100%'}
            src={readBooks}
            alt="Person with social media icons around"
          />
        </Center>
      </Grid>
    </Flex>
  )
}
