import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import Head from 'next/head';

const SuccessPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Extract session_id from URL
    const sessionId = router.query.session_id;

    if (sessionId) {
      verifySession(sessionId);
    }
  }, [router.query.session_id]);

  const verifySession = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await response.json();
      setSession(data);
    } catch (error) {
      console.error('Error verifying session:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const sessionId = router.query.session_id;
    console.log("Session ID:", sessionId); // Check the session ID value
    if (sessionId) {
      verifySession(sessionId);
    }
  }, [router.query.session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
          <Head>
          <title>RankiAI | Success</title>
          <meta name="description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" /> 
          <link rel="canonical" href="https://ranki.ai/success"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="RankiAI | Success" />
           <meta property="og:description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
           <meta property="og:image" content="/favicon.png" />
           <meta property="og:url" content="https://ranki.ai/success" />
           <meta property="og:site_name" content="RankiAI" />
 
        </Head>
    <div>
        <Navbar />
        <div className='pricing-container'>
      <h1>Payment Successful!</h1>
      {session && (
        <div>
          <p>Thank you for your payment. User # {session.id}</p>

          {/* Display more information from the session as needed */}
        </div>
      )}
      </div>
      <Footer />
    </div>
    </>
  );
};

export default SuccessPage;
