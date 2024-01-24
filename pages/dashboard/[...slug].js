import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dashboard from '../../components/Dashboard';
import { useRouter, router } from 'next/router';
import Head from 'next/head';

const DashboardSlug = () => {
  const router = useRouter();
  const { slug } = router.query;
  // const [app, setApp] = useState(null);

  // useEffect(() => {
  //   const actualSlug = slug ? slug : null; // Handle array nature of slug in catch-all routes
  //   if (actualSlug) {

  //     axios.get(`/api/singleapp?slug=${actualSlug}`)
  //       .then(response => {
  //         console.log(response.data)
  //         setApp(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching app:', error);
  //       });
  //   }
  // }, [slug]);

  // Only render Dashboard if app data is available
  return ( 
    <>
       <Head>
          <title>RankiAI | Dashboard</title>
          <meta name="description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" /> 
          <link rel="canonical" href="https://ranki.ai/"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="RankiAI" />
           <meta property="og:description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
           <meta property="og:image" content="/favicon.png" />
           <meta property="og:url" content="https://ranki.ai/" />
           <meta property="og:site_name" content="RankiAI" />
           <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "url": "https://www.rankiai.com",
               "logo": "https://www.ranki.ai/public/favicon.png"
             })}}
         />
        </Head>
      <Navbar />
      {slug && <Dashboard slugID={slug} />}
      <Footer />
    </>
  );
};

export default DashboardSlug;
