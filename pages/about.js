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
          <h2 className='landing-subheader'><span className='header-color'>All-In-One</span> Website Tool</h2>
        </div>
      </div>

      <div className='home-about-container'>
        <div className='home-about-content'>
        <div className='home-about-content-text'>
        <h3 className='home-about-subheader'>Our <span className='header-color'>Mission</span></h3>
        <p className='home-about-p'>We get it, getting your website ranked can be... <b>alot</b>.<br></br> Especially if you: 
        <ol>
            <li>Have no idea what you&apos;re doing</li>
            <li>Have no interest in learning</li>
            <li>Just want to focus on your business</li>
          </ol> 
           So, we deicded to build a one stop shop for growing your website.</p>
        </div>
        <div className='home-about-content-img'>
        <img src='/dashboard.png' className='home-about-img' alt='Product Search'></img>
        </div>
        </div>
        <div className='home-about-content content-flip'>
        <div className='home-about-content-img'>
        <img src='/shop.webp' className='home-about-img' alt='Shopping Cart'></img>
        </div>
        <div className='home-about-content-text'>
        <h3 className='home-about-subheader'>How It <span className='header-color'>Works</span></h3>
        <p className='home-about-p'>We&apos;ve built an AI application that uses natural language processing (NLP) and user metrics to rank products. The application is designed to be a simple, streamlined way for you to find the best products for any given situation. All you have to do is type in what you want, and we&apos;ll take care of the rest.</p>
        </div>
        </div>
      </div>
      {/* <div className='home-team-container'>
          <h3 className='home-team-header'>Meet the Team</h3>
          <div className='home-team-profiles'>
          <div className='home-team-profile brandon-profile'>
            <div className='overlay'>
              <p className='profile-name'>Brandon Luffman</p>
              <p className='profile-title'>Co Founder, <b>CEO</b></p>
              <p className='profile-skills'>AI/Full Stack Developer</p>
              <Link href='https://www.linkedin.com/in/brandon-luffman10/' aria-label='Linkedin Profile' target='_blank' rel='noreferrer'><FaLinkedinIn className="profile-linkedin" alt='Social Icon' /></Link>
              </div>
          </div>
          <div className='home-team-profile marcus-profile'>
            <div className='overlay'>
              <p className='profile-name'>Marcus Oshodi</p>
              <p className='profile-title'>Co Founder, <b>COO</b></p>
              <p className='profile-skills'>AI/Big Data Developer</p>
              <Link href='https://www.linkedin.com/in/marcus-oshodi-579358199/' aria-label='Linkedin Profile' target='_blank' rel='noreferrer'><FaLinkedinIn className="profile-linkedin" alt='Social Icon' /></Link>
              </div>
            </div>
          </div>
      </div> */}
      <Footer />
    </>
  )
}
