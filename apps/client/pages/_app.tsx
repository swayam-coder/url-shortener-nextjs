import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Slink</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            xs: 500,
            sm: 800,
            md: 1000,
            lg: 1200,
            xl: 1400,
          },
          colors: {
            'white': ['white', 'wheat'],
            'teal': ['teal'],
            'black': ['black']
          },
          other: {
            links: {
              heroimglink: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            }
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
