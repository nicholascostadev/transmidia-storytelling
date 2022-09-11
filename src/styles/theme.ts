import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  ...config,
  fonts: {
    body: '"Roboto", sans-serif',
    heading: '"Roboto", sans-serif',
    fontWeight: '400',
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        background: props.colorMode === 'light' ? 'gray.50' : 'gray.800',
      },
    }),
  },
})

export default theme
