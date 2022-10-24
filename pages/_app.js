import Navbar from '../components/Navbar';
import '../styles/globals.scss';
import '@fontsource/montserrat';
import { SessionProvider } from 'next-auth/react';
import Loader from '../components/Loader';
import { useState } from 'react';
import Router from 'next/router';
import { SWRConfig } from 'swr';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import HamburgerMenu from '../components/HamburgerMenu';
import { MainProvider } from '../context/mainContext';

const fetcher = async (url) => await axios.get(url).then((res) => res.data);

const pageVariant = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  return (
    <SessionProvider session={session}>
      <MainProvider>
        <motion.div
          key={router.router}
          initial="pageInitial"
          animate="pageAnimate"
          variants={pageVariant}
        >
          <SWRConfig
            value={{
              refreshInterval: 2000,
              revalidateOnMount: true,
              fetcher,
            }}
          >
            <Toaster />
            <Navbar />
            {loading ? <Loader /> : <Component {...pageProps} />}
            <HamburgerMenu />
            <Footer />
          </SWRConfig>
        </motion.div>
      </MainProvider>
    </SessionProvider>
  );
}

export default MyApp;
