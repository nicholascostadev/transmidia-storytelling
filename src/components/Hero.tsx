import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import heroImage from '../assets/share.svg'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import Image from 'next/image'

export const Hero = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Encontrar o{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
          >
            público certo{' '}
          </Text>
          para a divulgação científica
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          A divulgação científica é uma das mais importantes atividades de
          pesquisa e deve ser feita de forma inclusiva e eficaz. Para isso, é
          importante que o conteúdo que escolha para divulgar esteja no lugar
          certo para atingir o maior público possível.{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, purple.400, purple.400, pink.400)"
            bgClip="text"
          >
            Nos ajude a encontrar o público certo para a divulgação científica e
            conseguir falar sobre ciência com todos.
          </Text>
        </Text>
        <Stack spacing={6} direction={['column', 'row']}>
          <NextLink href="/participate" passHref>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'purple'}
              bgGradient="linear(to-r, purple.400, pink.600, pink.700)"
              transition="all"
              _hover={{
                bg: 'purple.500',
                bgGradient: 'linear(to-r, purple.300, pink.400, pink.600)',
              }}
            >
              Participar da Pesquisa
            </Button>
          </NextLink>
          <Button
            as={Link}
            to="explanation"
            smooth={true}
            duration={600}
            href={'#explanation'}
            rounded={'full'}
            px={6}
          >
            Entender mais
          </Button>
        </Stack>
        <Flex w={'full'} justify="center" alignItems="center">
          <Box height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }}>
            <Image src={heroImage} alt="" />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
