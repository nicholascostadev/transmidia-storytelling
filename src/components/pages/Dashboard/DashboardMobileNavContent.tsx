import {
  Button,
  CloseButton,
  Link as ChakraLink,
  useColorModeValue,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { SignOut } from 'phosphor-react'
import { AiFillDashboard } from 'react-icons/ai'
import { MdManageAccounts } from 'react-icons/md'

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
      <Button
        w="full"
        variant="ghost"
        leftIcon={<SignOut style={{ transform: 'rotate(180deg)' }} />}
      >
        Sign Out
      </Button>
      {hasPermission && (
        <>
          <Button w="full" variant="ghost" leftIcon={<AiFillDashboard />}>
            <Link href="/admin/dashboard" passHref>
              <ChakraLink>Dashboard</ChakraLink>
            </Link>
          </Button>
          <Button w="full" variant="ghost" leftIcon={<MdManageAccounts />}>
            <Link href="/admin/manageusers" passHref>
              <ChakraLink>Gerenciar</ChakraLink>
            </Link>
          </Button>
        </>
      )}
    </VStack>
  )
}
