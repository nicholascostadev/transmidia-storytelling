import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  ...config,
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
    cursive: '"Nunito", sans-serif',
    fontWeight: '400',
  },
  colors: {
    ibmr: {
      100: '#3FDE8C',
      200: '#2EDC82',
      300: '#23D178',
      400: '#21C06E',
      500: '#1EAE64',
      600: '#1B9D5A',
      700: '#157946',
      800: '#157945',
      900: '#12683C',
    },
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? 'white' : 'gray.800',
      },
      '*': {
        scrollBehavior: 'smooth',
      },
      '.typed-cursor': 'red.500',
    }),
  },
})

export default theme
