import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

export const FinalCTA = () => {
  return (
    <Stack
      position="relative"
      textAlign={['center', 'left']}
      p={'2'}
      minH="80vh"
      w="1500px"
      maxW="100%"
      mx="auto"
      align="center"
      justify="center"
      spacing="20"
    >
      <motion.div
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        initial={{ opacity: 0, scale: 0.5, transitionDuration: '1.2s' }}
      >
        <Heading>
          Venha fazer parte da{' '}
          <Text as="span" color="purple.500" textDecoration="underline">
            revolução
          </Text>{' '}
          na divulgação científica
        </Heading>
      </motion.div>
      <motion.div
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          scale: 0.5,
          transitionDuration: '.5s',
          transitionDelay: '1s',
        }}
      >
        <Button
          as={NextLink}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfBo8-HhD5rPZZ6l4vMisPyZh52ANfDYhroCNM8t_2l8evtGA/viewform?usp=sharing"
          target="_blank"
          rel="noreferrer"
          rounded="full"
          w="15rem"
          size="lg"
          bgGradient="linear(to-r, purple.400, pink.600, pink.700)"
          transition="all"
          color="white"
          _hover={{
            bg: 'purple.500',
            bgGradient: 'linear(to-r, purple.300, pink.400, pink.600)',
          }}
        >
          Participar
        </Button>
      </motion.div>
    </Stack>
  )
}
