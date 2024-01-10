import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const cancel = () => {
  return (
    <>
    <Navbar />
    <div className='cancel-container flexer'>
        <p>Unfortuntely, your checkoout has been cancelled or did not go through. If you feel as if you got this message in error, please try again.</p>
    </div>
    <Footer />
    </>
  )
}

export default cancel