import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {GoVerified} from 'react-icons/go'
<<<<<<< HEAD
import Head from 'next/head'
import { FaEquals } from "react-icons/fa";
=======
import BuyingOption from '../components/BuyingOption'
import Head from 'next/head'
>>>>>>> origin/main

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
<<<<<<< HEAD
            {/* <img className='home-landing-img' src='/rocket.png'></img> */}
          <h1 className='home-landing-header'>Outrank Your Competition</h1>
            <p className='home-landing-p'>Elevate your website & skyrocket your SEO with our all-in-one Web Tool</p>
            <div className='home-landing-extension-div'>

              <Link href='/appdash'><button className='home-join-btn home-btn'><img src='/chatbot.png' width='30'></img>Try AppDash</button></Link>
              <Link href='/'><button className='home-join-extension-btn home-btn'><img src='/chrome.png' width='25'></img>Download on Chrome</button></Link>
            </div>

          </div>
          {/* <div className='home-landing-img-div'>
            <img src='/buildingsa.png' className='home-landing-image'></img>
            </div> */}
        </div>

        <div className='home-digital'>
          <div className='home-landing-text-container'>
          <h1 className='home-digital-header'>Welcome to the Digital World</h1>
          <div className='home-digital-p-container'>
            <div className='home-digital-p-div'><p className='home-digital-p'>Searches</p><FaEquals className='equal-sign'/><p className='home-digital-p'>Roads</p></div>
            <div className='home-digital-p-div'><p className='home-digital-p'>Websites</p><FaEquals className='equal-sign'/><p className='home-digital-p'>Buildings</p></div>
            <div className='home-digital-p-div'><p className='home-digital-p'>SEO</p><FaEquals className='equal-sign'/><p className='home-digital-p'>Real Estate</p></div>
            <p className='home-digital-p digital-p-last'>Become the anchor tenant of your Niche.</p>
            </div>
          </div>
          <div className='home-digital-img-div'>
            <img src='/buildingsa.png' className='home-digital-image'></img>
            <p className='home-digital-img-text img-txt-1'>Good SEO, Good Website<br></br>Good Visbility with good website backing it.</p>
            <p className='home-digital-img-text img-txt-2'>Bad SEO, Good Website<br></br>Great website, but with poor SEO no one will ever see it.</p>
            <p className='home-digital-img-text img-txt-3'>Bad SEO, Bad Website<br></br>Poor website with poor visibility, even if someone finds it they make not look inside for long.</p>
            <p className='home-digital-img-text img-txt-4'>Good SEO, Bad Website<br></br>Poor website but with it&apos;s positioning has the abikity to produce traction & leads.</p>

            </div>
        </div>

        <div className='landing-steps'>
      <div className='landing-step step-1'>
      <div className='landing-step-number'>1</div>
      <div className='landing-step-line'></div>
      <h3>Connect your domain</h3>
      <p>Easily integrate your domain through our trusted platform.</p>
      <img src='/integrate.png' className='landing-step-img'></img>
      </div>
      <div className='landing-step step-2'>
              <div className='landing-step-line-up'></div>
      <div className='landing-step-number'>2</div>
      <div className='landing-step-line'></div>
      <h3>Our AI gets to work</h3>
      <p>We build a custom AI model with your digital likeness.</p>
      <img src='/bot.png' className='landing-step-img'></img>
      </div>
      <div className='landing-step step-3'>
                      <div className='landing-step-line-up'></div>

      <div className='landing-step-number'>3</div>
      <div className='landing-step-line'></div>
            <h3>Make Adjustments</h3>
      <p>After analysis, you may notice some fixes our software detects in your website.</p>
      <img src='/seo-analytics.webp' className='landing-step-img'></img>
      </div>
      <div className='landing-step step-4'>
                      <div className='landing-step-line-up'></div>

      <div className='landing-step-number'>4</div>
      <div className='landing-step-line'></div>
      <h3>Start building your SEO</h3>
      <p>Manage and create your SEO optimized content in one spot using our AI content generation.</p>
      <img src='/build.svg' className='landing-step-img'></img>
      </div>
    </div>
     
        {/* <div className='home-sources gloss'>
=======
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
>>>>>>> origin/main
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
          <h2 className='home-join-header'>Start Saving <i>Money</i> & <i>Time</i> with <span className='header-color'>RankiAI</span> 💸</h2>
<<<<<<< HEAD
=======
          {/* <p className='home-join-p'>Automate your product research capabilities with our state of the art AI models that are trained to scour the internet and find the best products for your needs.</p> */}
>>>>>>> origin/main
          <div className='home-join-btns'>
          <div className='home-join-extension-div'>
            <button className='home-join-extension-btn'><img src='/chrome.png' width='25'></img>Download on Chrome</button>
          </div>
          <div className='home-join-beta-div'>
          <Link href='/home'><button className='home-join-btn'><img src='/ranki.png' width='30'></img>Try the Beta</button></Link>
          </div>
          </div>
<<<<<<< HEAD
        </div> */}
=======
          {/* <Link href='https://twitter.com/ranki_ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-twitter social-icon" icon={faTwitter} alt='Social Icon' /></Link>
                <Link href='https://instagram.com/ranki.ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-instagram social-icon" icon={faInstagram} alt='Social Icon' /></Link>
                <Link href='https://www.linkedin.com/company/rankiai/' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-linkedin social-icon" icon={faLinkedinIn} alt='Social Icon' /></Link> */}
        </div>
>>>>>>> origin/main
        <Footer />
    </div>
  )
}
