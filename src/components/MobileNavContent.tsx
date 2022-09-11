import {
  Button,
  CloseButton,
  useColorModeValue,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillCameraVideoFill } from 'react-icons/bs'

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
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  )
}
