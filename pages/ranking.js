import React, {useState} from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Ranking from '../components/Ranking'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Router } from 'next/router'
import RankingsDefault from '../components/RankingsDefault'
import Mentions from '../components/Mentions'
import HWCBanner from '../components/HWCBanner'
import Head from 'next/head'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Loading from '../components/Loading'
import NoResults from '../components/NoResults'
import Timeout from '../components/Timeout'

export async function getServerSideProps(context) {
  let query;
  if (context.query.q == undefined | context.query.q == ''){
    context.query.q = null
    console.log(context.query.q, 'null')
    const query = context.query.q
    const results = null
    return {
      props: {
        results,
        query
      }
    }
  } else {
      
    if (!context.query.q.includes('best ')) {
      query = 'best ' + context.query.q;
    } else {
      query = context.query.q;
    }
    const rep = await fetch(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/query?input=${query}`);
    const d = await rep.json();

    if (d == 'no query found') {
    console.log('None Found')

    // if (d == 'no query found') {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 40000);

    try {
      const response = await fetch('https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": query
        }),
        signal: controller.signal // Pass the AbortController's signal to the fetch request
      });

      const results = await response.json();
      clearTimeout(timeout);
      return {
        props: {
          results,
          query,
        },
      };
    } catch(error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        console.error(error);
      }
      const results = 'none';
      return {
        props: {
          results,
          query,
        },
      };
    }
  } else {
    console.log('Found it')
        const results = d;
        return {
          props: {
            results,
            query,
          },
      }
  }
  }
}

export default function Rank({ results, query }) {
  const router = useRouter();
 
  return ( 
    <div className='ranking-container'>
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
        {results == 'INVALID QUERY, PLEASE TRY SOMETHING ELSE' ? (<RankingsDefault />)
        : !results ? (
          <NoResults />
        ): results == 'none' ? (
          <Timeout />
        ): (
        <div className='rank-contain-full'>
            <h2 className='ranking-subheader'>Showing Results For</h2>
            <h1 className='ranking-header'>{query}</h1>
            <div className='rank-grid-container'>
                  <div className='rank-grid'>
                    {results.cards.sort((a, b) => a.rank - b.rank).map((product, i) => (
                      <Link href={`product/${product.id}`} key={product.id}>
                      <Ranking products={product} productid={product.id} />
                      </Link>
                    ))}
                  </div>
            </div>
            <div>
              <Mentions results={results} />
            </div>
            <div>
              <HWCBanner />
            </div>
        </div>  
        )}
    <Footer />
    </div>
  )
 }

