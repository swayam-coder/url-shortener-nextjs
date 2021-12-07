import { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps): JSX.Element  {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
    </>
  );
}

export default MyApp;