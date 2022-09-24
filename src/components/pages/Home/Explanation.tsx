import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import mediasImage from '../../../assets/medias.svg'
import { defaultGradientInv } from '../../../styles/global'

export const Explanation = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  return (
    <Box
      bg={bgColor}
      borderTop={useColorModeValue('1px', 'none')}
      borderColor={'gray.200'}
      shadow={useColorModeValue('base', 'none')}
      py="2"
      px={['6', '0']}
      mt="20"
    >
      <Flex
        id="explanation"
        position="relative"
        textAlign={['center', 'left']}
        p={'2'}
        w="1300px"
        minH="100vh"
        maxW="100%"
        mx="auto"
        align="center"
        justify="center"
      >
        <Grid
          gap={['0', '20']}
          templateColumns={['1fr', '1fr', '1fr', 'repeat(2, 1fr)']}
          maxW={'100%'}
          as={motion.div}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, scale: 0.2, transitionDuration: '1.2s' }}
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
            <Heading fontSize="3xl">O que é o Transmídia Storytelling?</Heading>
            <Text>
              Transmídia storytelling é uma técnica de contar uma história ou
              experiência em várias plataformas e formatos, usando os meios
              digitais. Por isso, na nossa pesquisa, procuramos entender qual o
              melhor caminho escolher para contar a história para falar de
              ciência com todos.{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                Junto com você
              </Text>
              , vamos descobrir o melhor veículo pra falar de{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={defaultGradientInv}
                bgClip="text"
              >
                ciência
              </Text>
              .{' '}
            </Text>
          </Stack>
        </Grid>
      </Flex>
    </Box>
  )
}
