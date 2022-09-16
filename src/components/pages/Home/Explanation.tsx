import {
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import mediasImage from '../../../assets/medias.svg'

export const Explanation = () => {
  return (
    <Flex
      id="explanation"
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
      >
        <Center pos="relative" minH="400px" maxW={'100%'}>
          {/* <NextImage width="100%" height="100%" layout="fill" src={mediasIllustration} /> */}
          <Image
            as={NextImage}
            flex="1"
            w="400px"
            maxW={'100%'}
            src={mediasImage}
            alt="Person with social media icons around"
          />
        </Center>
        <Stack flex="1" spacing="1rem" maxW={'100%'} minH="400px">
          <Heading>O que é o Transmídia Storytelling?</Heading>
          <Text fontSize="md">
            Transmídia storytelling é uma técnica de contar uma história ou
            experiência em várias plataformas e formatos, usando os meios
            digitais. Por isso, na nossa pesquisa, procuramos entender qual o
            melhor caminho escolher para contar a história para falar de ciência
            com todos.{' '}
            <Text
              fontWeight="bold"
              as="span"
              bgGradient="linear(to-r, purple.400, purple.400, pink.400)"
              bgClip="text"
            >
              Junto com você
            </Text>
            , vamos descobrir o melhor veículo pra falar de{' '}
            <Text
              fontWeight="bold"
              as="span"
              bgGradient="linear(to-r, pink.400, purple.400, purple.500)"
              bgClip="text"
            >
              ciência
            </Text>
            .{' '}
          </Text>
        </Stack>
      </Grid>
    </Flex>
  )
}
