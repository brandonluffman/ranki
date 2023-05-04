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

export default function Home({products, searches}) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query  == '') {
      router.push(`/`);
    } else {
    router.push(`/ranking?q=${query}`);
    }
  };

  const handleChange = async (e) => {
    if (e.target.value != ''){
        setQuery(e.target.value);
      // setTimeout(async () => {
      //   const res = await axios.get(`http://3.130.4.98/blackwidow/products/${e.target.value}`);
      //   const sug = await res.data;
      //   setSuggestions(sug)
      //   return res.data.results;
      // }, 1000);
    } else {
      setQuery('');
      console.log('nada')
    }
  };

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
        <link rel="icon" href="/logos/2.png" />
      </Head>
      <NavbarNI /> 
      <div className='landing-cont'>
       <div className='landing-container'>
         <div className='landing-div'>
          <div className='landing-flexer'>
            <h1 className='landing-header'><span className='lighter'>RANKI</span> AI</h1>
            </div>
           <form className='form' onSubmit={handleSubmit}>
             <input
              type="text"
              id="query"
              value={query}
              onChange={handleChange}
              // onClick={searchToggle}
              className='landing-input'
              placeholder='Search for a product...'
            />
           <button className='landing-btn' type="submit"><BsSearch className='input-search-icon'/></button>
           
             <div className='input-suggestions'>
              {Array.isArray(suggestions) && (
                suggestions.slice(0,10).map((suggestion,i) => (
                  <Link href={`product/${suggestion[0]}`} key={suggestion[0]} className='input-suggestion-div'>
                    {suggestion[1] == 'hello' ? (
                      <img src='/zon.png' width='50'></img>
                    ):(
                      <img src={suggestion[2]} width='50'></img>
                    )}
                    <p>{suggestion[1]}</p>
                    </Link>
                ))
              )}
            </div> 
          </form>
        </div>
      </div>
      <LandingCats searches={searches} />
      <div className='analytics-cards'>
        <HomeAnalytics {...props} />
      </div>
      </div>
      <Footer />
    </>):
    (<ErrorPage />)
  )
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library

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

    const res = await fetch('http://3.130.4.98/blackwidow/trending/products/')
    const products = await res.json()
    const resp = await fetch('http://3.130.4.98/blackwidow/trending/searches/')
    const searches = await resp.json()
 
  return {
    props: {
      products,
      searches,
    },
  }
}