import Link from 'next/link'
import React from 'react'

const HWCBanner = () => {
  return (
    <div className='hwc-container'>
        <h2 className='hwc-header'>Curious how we calculate our rankings?</h2>
        <Link href='/about'><button className='hwc-btn' type='button'>Learn More</button></Link>
    </div>
  )
}

export default HWCBanner