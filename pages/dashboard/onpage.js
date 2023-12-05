import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

const onpage = () => {
  return (
    <>
    <Navbar />
    <div className='dash-branch-container'>
        <Link href='/dashboard'>Back to Dash</Link>
    <div className='dash-branch-grid'>
        <h1>On-Page SEO</h1>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default onpage