import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const DashContent = () => {
  return (
    <div className='dashboard-content-container'>
        <button type='submit' className='add-content-container'><IoMdAdd /></button>
    <h2 className='dash-content-header'>Blog Content</h2>
    <div className='dash-content-grid'>
      <div className='dash-content-grid-item'>
            <h6 className='content-item-header'>7 Ways to Optimize On-Page SEO</h6>
            <h6 className='content-item-header'>Insert Content Data</h6>

      </div>
      <div className='dash-content-grid-item'>
            <h6 className='content-item-header'>7 Ways to Optimize On-Page SEO</h6>
      </div>
      <div className='dash-content-grid-item'>
            <h6 className='content-item-header'>7 Ways to Optimize On-Page SEO</h6>
      </div>
      <div className='dash-content-grid-item'>
            <h6 className='content-item-header'>7 Ways to Optimize On-Page SEO</h6>
      </div>
    </div>
  </div>
  )
}

export default DashContent