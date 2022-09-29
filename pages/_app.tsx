import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '../styles/theme.conf';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
