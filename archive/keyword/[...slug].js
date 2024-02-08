import React from 'react'
import { useRouter, router } from 'next/router';
import Keywords from '../../components/Keywords';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const KeywordSlug = () => {
    const router = useRouter();
    const { slug } = router.query;

    
  return (
    <>
    <Navbar />
              {slug && <Keywords slug={slug} />}
    <Footer />
    </>
  )
}

export default KeywordSlug