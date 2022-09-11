import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Explanation } from '../components/Explanation'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Motivation } from '../components/Motivation'

const Home: NextPage = () => {
  return (
    <Box>
      <Head>
        <title>Transmídia Storytelling</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Explanation />
        <Motivation />
        <FinalCTA />
      </main>

      <Footer />
    </Box>
  )
}

export default Home
