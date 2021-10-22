import { AppProps } from 'next/app'
import AuthContext from "../contexts/AuthContext";
import 'tailwindcss/tailwind.css'
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element  {
  return (
    <ChakraProvider>
        <AuthContext>
            <Component {...pageProps} />
        </AuthContext>
        </ChakraProvider>
  );
}

export default MyApp;

// _app.js or ts contains the entire skeleton of our app in nextjs so all the context are provided here

// index.html workaround for next.js??