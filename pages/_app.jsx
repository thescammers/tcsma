import '../styles/globals.css'
import dynamic from "next/dynamic";
import {Provider} from './context/Context'

const App = ({ Component, pageProps }) => {
  return (
     <Provider>
       <Component {...pageProps} />
     </Provider>)
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});