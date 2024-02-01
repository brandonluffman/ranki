import React from 'react'
import Generate from '../components/Generate'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const generate = () => {
  return (
    <>
    <Navbar />
    <div className='test-container'>
        <Generate />
    </div>
    <Footer />
    </>
  )
}

export default generate