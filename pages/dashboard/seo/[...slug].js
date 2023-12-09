import React from 'react'
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Dashboard from '../../../components/Dashboard';
import SEODashboard from '../../../components/SEODashboard';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SEOSlug = () => {
    const router = useRouter();
    const { slug } = router.query;
    return ( 
      <>
        <Navbar />
        {slug ? (<SEODashboard  slugID={slug} />):(<div className='no-user-container'><h3>No Dashboard at this address, go back to the <Link href='/dashboard'>Dash</Link></h3></div>)} 
        <Footer />
      </>
    );
  };

export default SEOSlug