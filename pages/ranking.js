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

//   const query = context.query.q;
//   try {
//     const response = await fetch('http://3.130.4.98/blackwidow', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "query": query
//       }),
//     });
//     const results = await response.json();
//     return {
//       props: {
//         results,
//         query,
//       },
//     };
//   } catch(e){
//     console.log(e)
//     const results = ''
//     return {
//       props: {
//         results,
//         query,
//       },
//     };
//   }
// }
// }

const query = context.query.q;
try {
  const response = await fetch('http://3.130.4.98/blackwidow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "query": query
    }),
  });
  // const response = await fetch('http://127.0.0.1:8000/blackwidow/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "query": query
  //   }),
  // });
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
}
}

export default function Rank({ results, query }) {
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
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
  
  const router = useRouter();

  if (results) {
    const links = results.links
    // const que = results.query.replaceAll('+', ' ')
    console.log(results)

  } else {
    const links = null
    const que = ''
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  return (
    
    <div className='ranking-container'>
         <Head>
        <title>RANKI</title>
        <meta name="description" content="RANKI AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logos/2.png" />
      </Head>
      <Navbar />
        {results ? (
        <div>
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
        ) : results == 'INVALID QUERY, PLEASE TRY SOMETHING ELSE' ? (
        <RankingsDefault />
        ) : results == 'INVALID QUERY' (
          <NoResults />
        )}
    <Footer />
    </div>
  )
 }

