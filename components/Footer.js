import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import {GoMail } from 'react-icons/go';
import {IoIosPhonePortrait} from 'react-icons/io';

const Footer = () => {
  return (
    <div>
    <footer className="footer">
      <div className="container-fluid footer-container" id="services">
           <div className='footer-top'>
            <div className='footer-brand-container'>
              <div className='footer-brand-img'>
                  <img src='/ranki.png' alt="Brand Logo" className='footer-brand-logo' loading="lazy" />
              </div>
              
              <div className='social-icons'>
                <Link href='https://twitter.com/ranki_ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-twitter social-icon" icon={faTwitter} alt='Social Icon' /></Link>
                <Link href='https://instagram.com/ranki.ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-instagram social-icon" icon={faInstagram} alt='Social Icon' /></Link>
                <Link href='https://www.linkedin.com/company/rankiai/' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-linkedin social-icon" icon={faLinkedinIn} alt='Social Icon' /></Link>
              </div>
              </div>
              
              <div className='footer-links-container'>
                          <div className='footer-links'>
                            <div className='footer-links-header'><p className='footer-link-header'>RANKI AI</p></div>
                            <Link href='/'><div className='footer-link'>Home</div></Link>
                            <Link href='/about'><div className='footer-link'>About</div></Link>
                            <Link href='/ranking'><div className='footer-link'>Rankings</div></Link>
                            {/* <Link href='/contact'><div className='footer-link'>Contact Us</div></Link> */}
                          </div>
                          <div className='footer-links'>
                            <div className='footer-links-header'><p className='footer-link-header'>Support</p></div>
                            <Link target='_blank' rel='noreferrer' href='https://www.privacypolicygenerator.info/live.php?token=X9rYsibwbs1UKYQ41C7KL0IBJSIEOkts'><div className='footer-link'>Privacy Policy</div></Link>
                            <Link target='_blank' rel='noreferrer' href="https://www.termsofusegenerator.net/live.php?token=WtIAwIaSx5ilU5RgC3s2N2AtWAptbnTh"><div className='footer-link'>Terms of Use</div></Link>
                            {/* <Link href='/'><div className='footer-link'>FAQs</div></Link> */}
                          </div>
                          <div className='footer-links contact-links'>
                            <p className='footer-links-header'>Contact</p>
                            <p className='footer-link'><GoMail className='footer-contact-icon' /> info@ranki.ai</p>
                            {/* <p className='footer-link'><IoIosPhonePortrait className='footer-contact-icon' /> (111) 222-3333</p> */}
                          </div>
                </div>
              </div>   
              <div className='copyright-footer'>
                  <p className='footer-copyright-content'>Copyright © {new Date().getFullYear()} RankiAI - All Rights Reserved.</p>
              </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer