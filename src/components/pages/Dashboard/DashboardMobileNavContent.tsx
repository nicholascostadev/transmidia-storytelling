import {
  Button,
  CloseButton,
  Link as ChakraLink,
  useColorModeValue,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Faders, SignOut, UserGear } from 'phosphor-react'

interface MobileNavContentProps {
  mobileNav: UseDisclosureProps
  hasPermission: boolean
}

export const DashboardMobileNavContent = ({
  mobileNav,
  hasPermission,
}: MobileNavContentProps) => {
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p="2"
      pb="4"
      pt="12"
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
      <Button
        w="full"
        variant="ghost"
        colorScheme="pink"
        onClick={() => signOut()}
        leftIcon={<SignOut style={{ transform: 'rotate(180deg)' }} />}
      >
        Sign Out
      </Button>
      {hasPermission && (
        <>
          <Button w="full" variant="ghost" leftIcon={<Faders />}>
            <ChakraLink as={Link} href="/admin/dashboard">
              Dashboard
            </ChakraLink>
          </Button>
          <Button w="full" variant="ghost" leftIcon={<UserGear />}>
            <ChakraLink as={Link} href="/admin/manageusers">
              Gerenciar
            </ChakraLink>
          </Button>
        </>
      )}
    </VStack>
  )
}
