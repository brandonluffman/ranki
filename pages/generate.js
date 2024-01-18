import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Generate from '../components/Generate'


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