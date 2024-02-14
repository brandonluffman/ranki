import React from 'react'
import Generate from '../components/Generate'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GenerateTest from '../components/GenerateTest'

const generatetest = () => {
  return (
    <>
    <Navbar />
    <div className='test-container'>
        <GenerateTest />
    </div>
    <Footer />
    </>
  )
}

export default generatetest