import {
  Button,
  CloseButton,
  useColorModeValue,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { CaretRight } from 'phosphor-react'

interface MobileNavContentProps {
  mobileNav: UseDisclosureProps
}

export const MobileNavContent = ({ mobileNav }: MobileNavContentProps) => {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p="4"
      pt="12"
      pb={4}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        position="absolute"
        right="4"
        top="4"
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Link href="/participate" passHref>
        <Button
          as="a"
          w="full"
          variant="ghost"
          colorScheme="purple"
          mt="4"
          leftIcon={<CaretRight />}
        >
          Participar
        </Button>
      </Link>
    </VStack>
  )
}
