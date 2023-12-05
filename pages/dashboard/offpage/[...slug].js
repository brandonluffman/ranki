import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Dashboard from '../../../components/Dashboard';
import { useRouter, router } from 'next/router';
import TechnicalDashboard from '../../../components/TechnicalDashboard';
import OffPageDashboard from '../../../components/OffPageDashboard';

const OffPageApp = () => {
  const router = useRouter();
  const { slug } = router.query;
  return ( 
    <>
      <Navbar />
      {slug ? (<OffPageDashboard idslug={slug} />):(<div>Technical Dashboard No Slug</div>)}
      <Footer />
    </>
  );
};

export default OffPageApp;