import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import {supabase} from '../utils/supabaseClient'
// import Test from '../components/Test';
import GoogleAnalytics from '../components/GoogleAnalytics';
import TextEditor from '../components/TextEditor';

const test = () => {
    
  return (
    <>
    <Navbar />
    <div className='test-container'>
        {/* <Test /> */}
        {/* <GoogleAnalytics /> */}
        <TextEditor />
        </div>
    <Footer />
</>
  )
}

export default test

