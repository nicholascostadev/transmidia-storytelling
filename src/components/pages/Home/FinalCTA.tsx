import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'

export const FinalCTA = () => {
  return (
    <Stack
      position="relative"
      textAlign={['center', 'left']}
      p={'2'}
      minH="80vh"
      w="1300px"
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
      <Link as={NextLink} href="/participate" passHref>
        <Button
          as={motion.a}
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
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            scale: 0.5,
            transitionDuration: '.5s',
            transitionDelay: '1s',
          }}
        >
          Participar
        </Button>
      </Link>
    </Stack>
  )
}
