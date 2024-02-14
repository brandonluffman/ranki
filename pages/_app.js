import '../styles/globals.css';
import '../styles/index.css';
import '../styles/navbar.css';
import '../styles/formsubmit.css';
import '../styles/footer.css';
import '../styles/about.css';;
import '../styles/loading.css';
import '../styles/home.css';
import '../styles/dashboard.css';
import '../styles/dashbranch.css';
import '../styles/appdash.css';
import '../styles/appdashform.css';
import '../styles/technicaldashboard.css';
import '../styles/dashcontent.css';
import '../styles/register.css';
import '../styles/test.css';
import '../styles/technicalcontrolboard.css';
import '../styles/gmbdash.css';
import '../styles/breadcrumbs.css';
import '../styles/blog.css';
import '../styles/messages.css';
import '../styles/pricing.css';
import '../styles/reviews.css';
import '../styles/chatbot.css';
import '../styles/blogedit.css';
import '../styles/logoslider.css';
import '../styles/blogpage.css';
import '../styles/multistepform.css';
import '../styles/gpt.css';
import '../styles/generate.css';
import '../styles/account.css';
import '../styles/cancel.css';
import '../styles/privacyterms.css';
import '../styles/keywords.css';
import '../styles/alertbanner.css'

import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';
import { usePageLoading } from '../hooks/usePageLoading';
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Loading from '../components/Loading';
import { UserProvider } from '../context/UserContext';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function App({ Component, pageProps, router }) {
  const { isPageLoading } = usePageLoading();

  return (
    <UserProvider>
      {isPageLoading ? (
        <Loading />
      ) : (
        <Component {...pageProps} />
      )}
    </UserProvider>
  );

}
