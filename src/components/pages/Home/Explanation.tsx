import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { textGradientWithDir, bgGradientWithDir } from '../../../styles/global'
import { ChakraCustomImage } from '../../ChakraCustomImage'

export const Explanation = () => {
  return (
    <Box
      bgGradient={bgGradientWithDir('to-br', 500, 900)}
      borderTop={useColorModeValue('1px', 'none')}
      color="white"
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
        w="1500px"
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
          initial={{ opacity: 0, scale: 0.6, transitionDuration: '1.2s' }}
        >
          <Center pos="relative" minH="400px" maxW={'100%'}>
            <ChakraCustomImage
              flex="1"
              width={600}
              height={400}
              src="/images/medias.svg"
              alt="Pessoa com ícones de mídias sociais ao redor"
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
                bgGradient={textGradientWithDir('to-r', 500, 400)}
                bgClip="text"
              >
                Junto com você
              </Text>
              , vamos descobrir o melhor veículo pra falar de{' '}
              <Text
                fontWeight="bold"
                as="span"
                bgGradient={textGradientWithDir('to-r', 500, 400)}
                bgClip="text"
              >
                ciência.
              </Text>
            </Text>
          </Stack>
        </Grid>
      </Flex>
    </Box>
  )
}
