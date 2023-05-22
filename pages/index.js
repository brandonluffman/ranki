import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {GoVerified} from 'react-icons/go'
import BuyingOption from '../components/BuyingOption'

export default function Home(){
  return (
    <div>
        <Navbar />
        <div className='home-landing'>
          <div className='home-landing-gradient'></div>
          <div>
          <h1 className='home-landing-header'>Stop Spending Hours Comparing Products</h1>
            <Link href='/'><button className='home-join-btn'><img src='/ranki.png' width='20'></img>Try the Beta</button></Link>
            <div className='home-landing-extension-div'>
            <Link href='https://chrome.google.com/webstore/detail/hunter-email-finder-exten/hgmhmanijnjhaffoampdlllchpolkdnj?hl=en'><button className='home-join-extension-btn'><img src='/chrome.png' width='20'></img>Download on Chrome</button></Link>
          </div>

          </div>
            <img src='/ranks.png' className='home-landing-image'></img>
        </div>
        <div className='home-analyze'>
          <h2 className='home-analyze-header'>Analyze All Customer Opinions in Seconds</h2>
          <div className='home-analyze-images'>
            <img src='/soundguys.png' className='home-analyze-image'></img>
            <img src='/thread.png' className='home-analyze-image'></img>
            <img src='/amznreviews.png' className='home-analyze-image'></img>
          </div>
          <div className='home-analyze-single-img-div'>
            <img className='home-analyze-single-img' src='/productpage.png'></img>
          </div>
          <div className='home-prices'>
          <h2 className='home-prices-header'>Compare All Product Prices From Verified Sellers <GoVerified className='verified-icon' /> Updated Hourly</h2>
          <div className='home-prices-bottom-container'>
          <div className='home-prices-img-div'>
          <img src='/verizon-prod-page.png' className='home-prices-image'></img>
          <img src='/apple-prod-page.png' className='home-prices-image'></img>
          <img src='/best-buy-prod-page.png' className='home-prices-image'></img>
          </div>
          <div className='home-prices-product-buying'>
            <BuyingOption /> 
            <BuyingOption /> 
            <BuyingOption /> 
            <BuyingOption /> 
            <BuyingOption /> 
          </div>
          </div>
          </div>
        </div>
        <div className='home-sources gloss'>
          <h2>From The Sources You Trust 🤝</h2>
          <div className='home-sources-logos'>
          <img src='/reddit.png' width='50'></img>
          <img src='/reddit.png' width='50'></img>
          <img src='/reddit.png' width='50'></img>
          <img src='/reddit.png' width='50'></img>
          <img src='/reddit.png' width='50'></img>

          </div>
        </div>
        <div className='home-join'>
          <h2 className='home-join-header'>Start Saving <i>Money</i> & <i>Time</i> with <span className='header-color'>RANKI</span> 💸</h2>
          <p className='home-join-p'>Automate your product research capabilities with our state of the art AI models that are trained to scour the internet and find the best products for your needs.</p>
          <div className='home-join-extension-div'>
            <button className='home-join-extension-btn'><img src='/chrome.png' width='20'></img>Download on Chrome</button>
          </div>
          <div className='home-join-beta-div'>
          <button className='home-join-btn'>Try the Beta</button>
          </div>
          <Link href='https://twitter.com/ranki_ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-twitter social-icon" icon={faTwitter} alt='Social Icon' /></Link>
                <Link href='https://instagram.com/ranki.ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-instagram social-icon" icon={faInstagram} alt='Social Icon' /></Link>
                <Link href='https://www.linkedin.com/company/rankiai/' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-linkedin social-icon" icon={faLinkedinIn} alt='Social Icon' /></Link>
        </div>
        <Footer />
    </div>
  )
}
