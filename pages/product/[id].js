import { useRouter } from 'next/router'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar'
import ProductDescription from '../../components/ProductDescription';
import { useEffect } from 'react';
import ProductNotFound from '../../components/ProductNotFound';
import Head from 'next/head';

function Product({ product, id }) {
    const router = useRouter();
    // console.log(product.product == undefined)

    // console.log(product)

   if (router.isFallback) {
    return <div>Loading...</div>
   }
    return (
      <>
      <Head>
        <title>RANKI AI - {product.entity}</title>
        <meta name="description" content='RANKI AI' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" href="/2.png" /> 
        <link rel="canonical" href="https://ranki.ai/"/>
        <link rel="icon" href="/2.png" />
      </Head>
      {product == 'PRODUCT NOT AVAILABLE' ? 
        <>
        <Navbar />
      <ProductNotFound />
      <Footer />
      </>
      :
      <>
        <Navbar />
        <ProductDescription product={product}/>
        <Footer />
        </>
      }
      </>
    )
}


export async function getServerSideProps(context) {
  const { id } = context.query;

  console.log("ID------>", id)
  // send a GET request with the id as a query parameter
  const response = await fetch(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/products/product/${id}`);
  const product = await response.json();
  console.log(product)
  return {
    props: {
      product
    },
  };
}

export default Product;


