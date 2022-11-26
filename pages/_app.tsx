import { Session } from "next-auth";
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import theme from '../styles/theme.conf';
import Navbar from '../components/layout/navbar';
import store from "../store";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp
