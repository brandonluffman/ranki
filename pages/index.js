import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {GoVerified} from 'react-icons/go'
import BuyingOption from '../components/BuyingOption'
import Head from 'next/head'

export default function Home(){
  return (
    <div>
        <Head>
        <title>RANKI AI</title>
        <meta name="description" content="RANKI AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" href="/logos/2.png" /> 
        <link rel="canonical" href="https://ranki.ai/"/>
        <link rel="icon" href="/logos/2.png" />
      </Head>
        <Navbar />
        <div className='home-landing'>
          <div className='home-landing-gradient'></div>
          <div className='home-landing-text-container'>
          <h1 className='home-landing-header'>Stop Spending Hours Comparing Products</h1>
            <p className='home-landing-p'>Automate your product research capabilities with our state of the art AI models that are trained to scour the internet and find the best products for your needs.</p>

            <Link href='/home'><button className='home-join-btn home-landing-beta-btn'><img src='/ranki.png' width='30'></img>Try the Beta</button></Link>
            <div className='home-landing-extension-div'>
            <Link href='/'><button className='home-join-extension-btn'><img src='/chrome.png' width='25'></img>Download on Chrome</button></Link>
          </div>

          </div>
          <div className='home-landing-img-div'>
            <img src='/ranks.png' className='home-landing-image'></img>
            </div>
        </div>
        {/* <div className='home-analyze'>
          <h2 className='home-analyze-header'>Analyze All Customer Opinions in Seconds</h2>
          <div className='home-prices'>
          <h2 className='home-prices-header'>Compare All Product Prices From Verified Sellers <GoVerified className='verified-icon' /> Updated Hourly</h2>
          </div>
        </div> */}
        <div className='home-sources gloss'>
          <h2>From The Sources You Trust 🤝</h2>
          <div className='home-sources-logos'>
          <img src='/cnet.png' className='home-source source-cnet'></img>
          <img src='/cnnn.png' className='home-source source-cnn'></img>
          <img src='/reddit.png' className='home-source source-reddit'></img>
          <img src='/bestbuy.png' className='home-source source-pcmag'></img>
          <img src='/google.png' className='home-source source-google'></img>

          </div>
        </div>
        <div className='home-join'>
          <h2 className='home-join-header'>Start Saving <i>Money</i> & <i>Time</i> with <span className='header-color'>RANKI</span> 💸</h2>
          {/* <p className='home-join-p'>Automate your product research capabilities with our state of the art AI models that are trained to scour the internet and find the best products for your needs.</p> */}
          <div className='home-join-btns'>
          <div className='home-join-extension-div'>
            <button className='home-join-extension-btn'><img src='/chrome.png' width='25'></img>Download on Chrome</button>
          </div>
          <div className='home-join-beta-div'>
          <Link href='/home'><button className='home-join-btn'><img src='/ranki.png' width='30'></img>Try the Beta</button></Link>
          </div>
          </div>
          {/* <Link href='https://twitter.com/ranki_ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-twitter social-icon" icon={faTwitter} alt='Social Icon' /></Link>
                <Link href='https://instagram.com/ranki.ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-instagram social-icon" icon={faInstagram} alt='Social Icon' /></Link>
                <Link href='https://www.linkedin.com/company/rankiai/' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-linkedin social-icon" icon={faLinkedinIn} alt='Social Icon' /></Link> */}
        </div>
        <Footer />
    </div>
  )
}
