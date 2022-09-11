import { Box, Grid } from '@chakra-ui/react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ParticipateForm } from '../components/ParticipateForm'

export const Participate = () => {
  return (
    <>
      <Header />
      <Box>
        <Grid
          maxW="1200px"
          mx="auto"
          gap="1rem"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
          pt="7.5rem"
        >
          <Box>Participate</Box>
          <Box>
            <ParticipateForm />
          </Box>
        </Grid>
        <Footer />
      </Box>
    </>
  )
}

export default Participate
