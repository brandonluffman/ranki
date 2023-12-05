import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Dashboard from '../../../components/Dashboard';
import { useRouter, router } from 'next/router';
import TechnicalDashboard from '../../../components/TechnicalDashboard';
import OnPageSEODashboard from '../../../components/OnPageSEODashboard';

const OnPageApp = () => {
  const router = useRouter();
  const { slug } = router.query;
  return ( 
    <>
      <Navbar />
      {slug ? (<OnPageSEODashboard idslug={slug} />):(<div>Technical Dashboard No Slug</div>)}
      <Footer />
    </>
  );
};

export default OnPageApp;