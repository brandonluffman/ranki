import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import {supabase} from '../utils/supabaseClient'
// import Test from '../components/Test';
import GoogleAnalytics from '../components/GoogleAnalytics';
import TextEditor from '../components/TextEditor';
import GPTForm from '../components/GPTForm';
import { UserContext } from '../context/UserContext';
import PricingOfficial from '../components/PricingOfficial';
import AddBlogOfficial from '../components/AddBlogOfficial';

const test = () => {

  return (
    <>
    <Navbar />
    <div className='test-container'>
        {/* <Test /> */}
        {/* <GoogleAnalytics /> */}
        {/* <TextEditor /> */}
        {/* <GPTForm /> */}
        {/* <PricingOfficial /> */}
        {/* <AddBlogOfficial /> */}
        </div>
    <Footer />
</>
  )
}

export default test

