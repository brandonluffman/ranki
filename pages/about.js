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
        <title>RANKI AI</title>
        <meta name="description" content="RANKI AI is an AI Application that uses machine learning to assess product data and provide a user with the best products tailed to their needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" href="/logos/2.png" /> 
        <link rel="canonical" href="https://ranki.ai/"/>
        <link rel="icon" href="/logos/2.png" />
      </Head>
      <Navbar />
      <div className='about-container'>
        <div className='landing-div'>
            <div className='about-flexer'>
            {/* <img className='about-flexer-img' src='ranki.png'></img> */}
          {/* <h1 className='about-header'>RANKI AI</h1> */}
          <img src='/R.png' alt='Brand Logo' width='600' className='about-logo'></img>
          </div>
          <h2 className='landing-subheader about-subheader'><span className='primary'>Automated</span> AI Content Generation</h2>
        </div>
      </div>
      {visible && 
      <div className='home-about-container'>
        <div className='home-about-content'>
        <div className='home-about-content-text'>
        <h3 className='home-about-subheader'>Our <span className='primary'>Mission</span></h3>
        <p className='home-about-p'>

            At the heart of our endeavor lies a simple yet profound understanding: navigating the intricacies of website ranking can be overwhelmingly complex. This is especially true if you find yourself in any of these scenarios:
            <ol>
            <li>Struggling with the nuances of SEO and digital marketing.</li>
            <li>Lacking the desire or time to delve into the complexities of online optimization.</li>
            <li>Wishing to concentrate solely on nurturing and expanding your business.</li>
            </ol>
            Recognizing these challenges, we were inspired to create a singular, all-encompassing solution designed to foster the growth of your website. Our application is more than just a tool; it&apos;s a comprehensive ecosystem tailored to simplify your digital journey. Whether you&apos;re a newcomer to the digital realm or a seasoned entrepreneur with little interest in the technicalities of web optimization, our platform is engineered to cater to your needs.

            We present to you a platform that streamlines the process of enhancing your website&apos;s visibility and performance. Through our intuitive and user-friendly interface, you&apos;ll have access to all the essential tools and insights needed to elevate your site&apos;s ranking, without the hassle of juggling multiple applications or mastering the intricacies of SEO.

            Join us in embracing a smarter, more efficient way to grow your online presence. Let our application be the catalyst that propels your website to new heights, allowing you to focus on what you do best: running your business.
         </p>
        </div>
        {/* <div className='home-about-content-img'>
        <img src='/dashboard.png' className='home-about-img' alt='Product Search'></img>
        </div> */}
        </div>
        <div className='home-about-content content-flip'>
        {/* <div className='home-about-content-img'>
        <img src='/shop.webp' className='home-about-img' alt='Shopping Cart'></img>
        </div> */}
        <div className='home-about-content-text'>
        <h3 className='home-about-subheader'>How It <span className='primary'>Works</span></h3>
                    <p className='home-about-p'>Introducing our revolutionary application, meticulously designed to be the ultimate command center for all your website management needs. Imagine a world where you can effortlessly ensure your website&apos;s aesthetic brilliance while simultaneously optimizing it for top search engine rankings. Our application is a comprehensive solution that seamlessly integrates various aspects of website management into one intuitive dashboard.

            Experience the convenience of having a personalized control panel for each of your websites. This innovative feature allows you to monitor critical metrics from Google Analytics and Search Console, track SEO performance, and keep a close eye on your keyword rankings. Gone are the days of juggling multiple tabs and tools; our application streamlines your workflow by providing all the essential resources and links in one consolidated location.

            Our platform is not just a tool; it&apos;s a strategic partner that empowers you to elevate your online presence. By integrating advanced analytics and SEO insights, it helps you make data-driven decisions to enhance your site&apos;s performance and visibility. Whether you&apos;re a small business owner, a digital marketing professional, or a webmaster, our application is tailored to meet your unique needs and help you achieve your digital goals with ease and efficiency.

            Embrace the future of website management with our cutting-edge application, where sophistication meets simplicity, and excellence is just a click away.</p>
        </div>
        </div>
      </div>
      }
      <Footer />
    </>
  )
}