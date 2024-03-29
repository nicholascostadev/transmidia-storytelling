import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ContactWidget } from '../components/ContactWidget'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Explanation } from '../components/pages/Home/Explanation'
import { FinalCTA } from '../components/pages/Home/FinalCTA'
import { Hero } from '../components/pages/Home/Hero'
import { Motivation } from '../components/pages/Home/Motivation'
import { WhoAreWe } from '../components/pages/Home/WhoAreWe'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Transmídia Storytelling</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box as="main" overflow="hidden">
        <Hero />
        <Explanation />
        <Motivation />
        <WhoAreWe />
        <FinalCTA />
      </Box>
      <Footer />
      <ContactWidget />
    </>
  )
}

export default Home
