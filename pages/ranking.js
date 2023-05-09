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
// console.log('D=', d)


if (d == 'no query found') {
console.log('None Found')
try {
    const response = await fetch('https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": query
      }),
    });
    const results = await response.json();
    return {
      props: {
        results,
        query,
      },
    };
  } catch(e){
    console.log(e)
    const results = ''
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

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return ( 
    <div className='ranking-container'>
         <Head>
        <title>RANKI</title>
        <meta name="description" content="RANKI AI" />
        <meta name="viewport" content="width=device-width, initial-scale=" />
        <link rel="icon" href="/logos/2.png" />
      </Head>
      <Navbar />
        {results == 'INVALID QUERY, PLEASE TRY SOMETHING ELSE' ? (<RankingsDefault />)
        : !results ? (
          <NoResults />
        ): (
        <div className='rank-contain-full'>
            <h2 className='ranking-subheader'>Showing Results For</h2>
            <h1 className='ranking-header'>{query}</h1>
            <div className='rank-grid-container'>
                  <div className='rank-grid'>
                    {results.cards.map((product, i) => (
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

