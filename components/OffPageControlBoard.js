import Link from 'next/link';
import React from 'react'

const OffPageControlBoard = () => {




  return (
    <div className='offpage-control-board'>
    <div className='tech-dash-grid'>
    <div className='tech-grid-item'>
      {/* {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Backlinks</h2>
      {/* {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>} */}
    </div>
    <div className='tech-grid-item'>
      {/* {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Unique Domains</h2>
      {/* {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>} */}
    </div>
    <div className='tech-grid-item'>
      {/* {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Link Freshness</h2>
      {/* {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>} */}
    </div>
    <div className='tech-grid-item'>
      {/* {metaTitle != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)} */}
      <h2 className='tech-grid-header'>Backlinks from similars</h2>
      {/* {metaTitle && <h3 className='tech-grid-content'>{metaTitle}</h3>} */}
    </div>
  </div>
  <div className='offpage-keyword-grid'></div>
  </div>
  )
}

export default OffPageControlBoard