import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavbarNI from '../components/NavbarNI';
import { BsSearch } from 'react-icons/bs';
import Footer from '../components/Footer';
import HomeAnalytics from '../components/HomeAnalytics';
import LandingCats from '../components/LandingCats';
import { useRouter } from 'next/router';
import axios from 'axios';
const cors = require('cors');
import ErrorPage from 'next/error';
import Loading from '../components/Loading';
import { motion, useAnimation } from "framer-motion";
import Form from '../components/Form';


export default function Home({products, searches}) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);



  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [isLoading, controls]);

  useEffect(() => {
    // Simulate loading data for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // console.log(searches)

  const props = {
    'products':products,
    'searches':searches
    }


  return (
    products ? (
    <>
      <Head>
        <title>RANKI</title>
        <meta name="description" content="RANKI AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
        <link rel="icon" href="/logos/2.png" />
      </Head>
      <NavbarNI /> 
      <div className='landing-contain'>
       <div className='landing-container'>
         <div className='landing-div'>
          <div className='landing-flexer'>
            <h1 className='landing-header'><span className='lighter'>RANKI</span> AI</h1>
            </div>
              <Form />  
        </div>
      </div>
      <LandingCats searches={searches} />
      <div className='analytics-cards'>
        <HomeAnalytics {...props} />
      </div>
      </div>
      <Footer />
    </> )
     :(<ErrorPage />)
  )
}

// export async function getStaticProps() {
//     const res = await fetch('http://127.0.0.1:8000/blackwidow/trending/products/')
//     const products = await res.json()
//     const resp = await fetch('http://127.0.0.1:8000/blackwidow/trending/searches/')
//     const searches = await resp.json()
 
//   return {
//     props: {
//       products,
//       searches,
//     },
//   }
// }
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

    const res = await fetch('https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/trending/products/')
    const products = await res.json()
    const resp = await fetch('https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/trending/searches/')
    const searches = await resp.json()
 
  return {
    props: {
      products,
      searches,
    },
  }
}