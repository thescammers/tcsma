import '../styles/globals.css'
import dynamic from "next/dynamic";
import Head from 'next/head'
import {Provider} from '../context/Context'

const App = ({ Component, pageProps }) => {
  return (
     <Provider>
       <Head>
        <title>The scam.</title>
      </Head>
       <Component {...pageProps} />
     </Provider>)
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});