import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  useSystemColorMode: true,
}

const theme = extendTheme({
  ...config,
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
    fontWeight: '400',
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
