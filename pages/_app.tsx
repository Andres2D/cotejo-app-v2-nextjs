import { Session } from "next-auth";
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import '../styles/globals.scss';
import theme from '../styles/theme.conf';
import Navbar from '../components/layout/navbar';
import store from "../store";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme} resetCSS>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Navbar />
          <QueryClientProvider client={queryClient}>
          <ColorModeScript initialColorMode={'light'} />
            <Component {...pageProps} />
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp
