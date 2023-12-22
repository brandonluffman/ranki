import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <div className='cta-banner'>
    <h2 className='cta-header'>Looking to automate content creation for your website?</h2>
    <p className='cta-subheader'>Boost your organic traffic with our advanced AI, designed to create search engine-optimized content for top-ranking results.</p>
    <Link href='/dashboard'><button className='btn btn-tertiary cta-btn'>Start Now</button> </Link>
    <img className='cta-landing-img' src='/chatbot.png'></img>
    </div>
  )
}

export default CTA