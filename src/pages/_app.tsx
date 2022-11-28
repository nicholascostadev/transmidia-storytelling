// src/pages/_app.tsx
import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import type { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import { trpc } from '@root/utils/trpc'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
