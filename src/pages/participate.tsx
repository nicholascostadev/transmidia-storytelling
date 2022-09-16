import { Box, Grid, useColorModeValue } from '@chakra-ui/react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ParticipateForm } from '../components/ParticipateForm'
import teachingIllustration from '../../src/assets/teaching.svg'
import { ChakraCustomImage } from '../components/ChakraCustomImage'

export const Participate = () => {
  const bgColor = useColorModeValue(
    'linear(to-tr, purple.400, pink.400)',
    'linear(to-tr, purple.800, pink.600)',
  )
  return (
    <>
      <Header />
      <Box bgGradient={bgColor}>
        <Box pb={8}>
          <ChakraCustomImage
            src={teachingIllustration}
            width={960}
            height={960}
            w={['20', '20', '550px', '600px', '650px', '100%']}
            display={['none', 'none', 'flex', 'flex', 'flex']}
            position="absolute"
            top="200"
            left="0"
            alt=""
            zIndex={1}
          />
          <Grid
            maxW="1200px"
            mx="auto"
            gap="1rem"
            gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
            pt="7.5rem"
          >
            <Box></Box>
            <Box zIndex={1000}>
              <ParticipateForm />
            </Box>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default Participate
