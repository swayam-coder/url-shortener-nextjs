import { AppProps } from 'next/app'
// import AuthContext from "../contexts/AuthContext";
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element  {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

// cookie auth, 3rd party auth
// _app.js or ts contains the entire skeleton of our app in nextjs so all the context are provided here

// index.html workaround for next.js??