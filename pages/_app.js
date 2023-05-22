import '../styles/globals.css';
import '../styles/index.css';
import '../styles/navbar.css';
import '../styles/formsubmit.css';
import '../styles/footer.css';
import '../styles/topranking.css';
import '../styles/mentions.css';
import '../styles/productdesc.css';
import '../styles/analytics.css';
import '../styles/landingcats.css';
import '../styles/about.css';
import '../styles/rankingdf.css';
import '../styles/productnf.css';
import '../styles/hwc.css';
import '../styles/minirank.css';
import '../styles/loading.css';
import '../styles/noresults.css';
import '../styles/home.css';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';
import { usePageLoading } from '../hooks/usePageLoading';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from '../components/Loading';

export default function App({ Component, pageProps, router }) {
  const { isPageLoading } = usePageLoading();

  return (
    isPageLoading ? (
      <Loading />
    ) : (
      <Component {...pageProps} />
    )
  )

}
