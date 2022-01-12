import { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate, Query } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from "styled-components";
import 'bootstrap/dist/css/bootstrap.css';
import { ContextProvider } from '../contexts';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps): JSX.Element  {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,  // refetches data when we visit back the window // refetchOnWindowFocus: 'always' ?
        retry: 3,
        staleTime: 30000,  // to eliminate api calls for 30 secs 
        
        /* Polling in React-Query for real-time data */
        // refetchInterval: 3,  // specifies the time interval after which refetches will happen
        // refetchIntervalInBackground: true  // if set to true refetching will happen even if the window is not focused (i.e. browser is minimized etc.) and if set to false then will only refetch on window focus
      },
    },
  })

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
              <Toaster />
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;