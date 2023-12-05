import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Dashboard from '../components/Dashboard';
import AppDash from '../components/AppDash';

const dashboard = () => {
  return (
    <>
        <Navbar />
            <div>
              <AppDash />
            </div>
        <Footer />
    </>
  )
}

export default dashboard