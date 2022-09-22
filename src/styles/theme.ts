import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
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
        background: props.colorMode === 'light' ? 'white' : 'gray.800',
      },
    }),
  },
})

export default theme
