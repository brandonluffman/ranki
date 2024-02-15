import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Script from 'next/script';
import { GoPrimitiveDot } from 'react-icons/go';
import {FaLinkedinIn} from 'react-icons/fa'
import Image from 'next/image';


export default function About() {
  const [visible, setVisisble] = useState(false);


  return (
    <>
      <Head>
          <title>RankiAI | About</title>
          <meta name="description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" /> 
          <link rel="canonical" href="https://ranki.ai/about"/>
          <meta property="og:type" content="article" />
           <meta property="og:title" content="RankiAI | About" />
           <meta property="og:description" content="Empower your business with RankiAI's AI Blog Generator. Designed for businesses seeking growth, our platform delivers top-tier, SEO-optimized content to boost your website's traffic and visibility. Harness the power of AI to elevate your brand and attract more customers. Start transforming your content strategy today!" />
           <meta property="og:image" content="/favicon.png" />
           <meta property="og:url" content="https://ranki.ai/about" />
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
      <div className='about-container'>
      <div className='landing-div'>
      
        <img src='/R.png' alt='Brand Logo' width='200' className='about-logo'></img>

        {/* <h2 className='landing-subheader about-subheader'>
          <span className='primary'>Our goal?</span> Using artificial intelligence to allow businesses to rank on Google so they can focus on what&apos;s important.
        </h2> */}
      </div>
    </div>
    {visible && (
      <div className='home-about-container'>
        <div className='home-about-content'>
          <div className='home-about-content-text'>
            <h3 className='home-about-subheader primary'>
              The Mission
            </h3>
            <p className='home-about-p'>
              At the heart of our endeavor lies a simple yet profound understanding... businesses focus too much of their time figuring out how to get ranked on Google.
             </p>
             <ol className='home-about-ordered'>
                <li>Struggling with the nuances of SEO and digital marketing.</li>
                <li>Lacking the desire or time to delve into the complexities of online optimization.</li>
                <li>Wishing to concentrate solely on nurturing and expanding your business.</li>
              </ol>
             <p>
             This is where we come in.... Recognizing these challenges, we were inspired to create a singular, all-encompassing solution designed to get your business ranked on Google.
            </p>
          </div>
          <div className='home-about-content-img'>
            <img src='/airpods.jpeg' className='home-about-img' alt='About Image 1'></img>
          </div>
        </div>
        <div className='home-about-content content-flip'>
          <div className='home-about-content-img'>
          <img src='/airpods.jpeg' className='home-about-img' alt='About Image 1'></img>
          </div>
          <div className='home-about-content-text'>
            <h3 className='home-about-subheader primary'>
              How It Works
            </h3>
            <p className='home-about-p'>
            Join us in embracing a smarter, more efficient way to grow your online presence. Let our application be the catalyst that propels your website to new heights, allowing you to focus on what you do best: running your business.
            </p>
            <p className='home-about-p'>
            Introducing our revolutionary application, meticulously designed to be the ultimate command center for all your website management needs. Imagine a world where you can effortlessly ensure your website&apos;s aesthetic brilliance while simultaneously optimizing it for top search engine rankings. Our application is a comprehensive solution that seamlessly integrates various aspects of website management into one intuitive dashboard.</p>
          </div>
        </div>
      </div>
    )}
    <Footer />
    </>
  )
}