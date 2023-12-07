import React from 'react'
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Dashboard from '../../../components/Dashboard';
import SEODashboard from '../../../components/SEODashboard';
import { useRouter } from 'next/router';

const SEOSlug = () => {
    const router = useRouter();
    const { slug } = router.query;

    return ( 
      <>
        <Navbar />
        {slug && <SEODashboard  slugID={slug} />}
        <Footer />
      </>
    );
  };

export default SEOSlug