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

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
        pageExit: {
          opacity: 0,
        },
      }}
      transition={{
        duration: 0.3,
      }}
    >
    <Component {...pageProps} key={router.route} />
    </motion.div>

    </ AnimatePresence>

  )

}
