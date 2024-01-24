import React from 'react'
import Pricing from '../components/Pricing'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Head from 'next/head'

const pricing = () => {
  return (
    <>
        <Head>
          <title>RankiAI | Pricing</title>
          <meta name="description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" /> 
          <link rel="canonical" href="https://ranki.ai/pricing"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="RankiAI | Pricing" />
           <meta property="og:description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
           <meta property="og:image" content="/favicon.png" />
           <meta property="og:url" content="https://ranki.ai/pricing" />
           <meta property="og:site_name" content="RankiAI" />
        </Head>
    <Navbar />
    <Pricing />
    <Footer />
</>
  )
}

export default pricing