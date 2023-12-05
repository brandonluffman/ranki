import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {supabase} from '../utils/supabaseClient'
import Test from '../components/Test';
import GoogleAnalytics from '../components/GoogleAnalytics';

const test = () => {


    
  return (
    <>
    <Navbar />
        {/* <Test /> */}
        <GoogleAnalytics />
    <Footer />
</>
  )
}

export default test
