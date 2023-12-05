import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dashboard from '../../components/Dashboard';
import { useRouter, router } from 'next/router';

const DashboardSlug = () => {
  const router = useRouter();
  const { slug } = router.query;
  // const [app, setApp] = useState(null);

  // useEffect(() => {
  //   const actualSlug = slug ? slug : null; // Handle array nature of slug in catch-all routes
  //   if (actualSlug) {

  //     axios.get(`/api/singleapp?slug=${actualSlug}`)
  //       .then(response => {
  //         console.log(response.data)
  //         setApp(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching app:', error);
  //       });
  //   }
  // }, [slug]);

  // Only render Dashboard if app data is available
  return ( 
    <>
      <Navbar />
      {slug && <Dashboard slugID={slug} />}
      <Footer />
    </>
  );
};

export default DashboardSlug;
