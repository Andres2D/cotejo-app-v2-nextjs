import { Session } from "next-auth";
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import theme from '../styles/theme.conf';
import Navbar from '../components/layout/navbar';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp
