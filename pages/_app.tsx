import { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from "styled-components";
import 'bootstrap/dist/css/bootstrap.css';
import { ContextProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps): JSX.Element  {
  const [queryClient] = useState(() => new QueryClient())

  const theme = {
    colors: {
      primary: "white"
    }
  }

  return (
    <>
      <ContextProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;