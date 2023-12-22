import React from 'react'
import BlogDash from '../components/BlogDash'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Blog from '../components/Blog'

const blog = () => {
  return (
    <>
    <Navbar />
    <div className='blogs-container'>
    <Blog />
    </div>
    <Footer />
    </>
  )
}

export default blog