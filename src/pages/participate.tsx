import { Box, Grid } from '@chakra-ui/react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ChakraCustomImage } from '../components/ChakraCustomImage'
import { bgGradientWithDir } from '../styles/global'
import Head from 'next/head'
import { ContactWidget } from '../components/ContactWidget'
import { ParticipateForm } from '../components/ParticipateForm'

export const Participate = () => {
  return (
    <>
      <Head>
        <title>TST | Participar</title>
      </Head>
      <Header />
      <Box
        bgGradient={bgGradientWithDir('to-tr', 400, 600)}
        minH="calc(100vh - 64px)"
      >
        <Box pb={8}>
          <ChakraCustomImage
            src="/images/teaching.svg"
            width={960}
            height={960}
            w={['20', '20', '550px', '600px', '650px', '100%']}
            display={['none', 'none', 'flex', 'flex', 'flex']}
            position="absolute"
            top="0"
            left="0"
            alt=""
            zIndex={1}
          />
          <Grid
            w="1300px"
            maxW="100%"
            mx="auto"
            gap="1rem"
            gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
            pt="7.5rem"
          >
            <Box></Box>
            <Box zIndex={500}>
              <ParticipateForm />
            </Box>
          </Grid>
        </Box>
      </Box>
      <Footer />
      <ContactWidget />
    </>
  )
}

export default Participate
