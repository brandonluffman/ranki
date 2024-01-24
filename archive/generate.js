import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Generate from '../components/Generate'
import Head from 'next/head'


const generate = () => {
  return (
    <>
       <Head>
          <title>RankiAI | Generate</title>
          <meta name="description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" /> 
          <link rel="canonical" href="https://ranki.ai/generate"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="RankiAI | Generate" />
           <meta property="og:description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
           <meta property="og:image" content="/favicon.png" />
           <meta property="og:url" content="https://ranki.ai/generate" />
           <meta property="og:site_name" content="RankiAI" />
           {/* <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "url": "https://www.rankiai.com",
               "logo": "https://www.ranki.ai/public/favicon.png"
             })}}
         /> */}
        </Head>
    <Navbar />
    <div className='test-container'>
        <Generate />
        </div>
    <Footer />
    </>
  )
}

export default generate