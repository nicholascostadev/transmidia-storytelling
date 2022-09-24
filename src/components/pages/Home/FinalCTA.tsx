import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
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
      <Heading>
        Venha fazer parte da{' '}
        <Text as="span" color="purple.400" textDecoration="underline">
          revolução
        </Text>{' '}
        na divulgação científica
      </Heading>
      <Link as={NextLink} href="/participate" passHref>
        <Button
          as="a"
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
      </Link>
    </Stack>
  )
}
