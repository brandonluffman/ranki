import React from 'react'
import { useRouter, router } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Generate from '../../components/Generate';

const GenerateSlug = () => {
    const router = useRouter();
    const { slug } = router.query;

    
  return (
    <>
    <Navbar />
    <div className='test-container'>
              {slug && <Generate slug={slug} />}
              </div>
    <Footer />
    </>
  )
}

export default GenerateSlug