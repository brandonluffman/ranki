import React from 'react'
const GMBDash = () => {
  return (
    <div className='gmd-dash-container'>
        <img className='/gmd-dash-img' src='/radar.png' width='100px'></img>
        <h6>Phantom</h6>
        <div className='flexer'><h6>4.9</h6><p>(27)</p> </div>
        <p>Electrician in Detroit Michigan</p>
        <ul className='flexer'>
            <li>Overview</li>
            <li>Directions</li>
            <li>Services</li>
            <li>Reviews</li>
            <li>Photos</li>
            <li>About</li>

        </ul>
        <div className='gmb-dash-btns flexer'>
            {/* <IoMdPhone />
            <IoMdPhone />
            <IoMdPhone />
            <IoMdPhone />
            <IoMdPhone /> */}
        </div>
        <button type='button' className='btn btn-primary'>Request a quote</button>
    </div>
  )
}

export default GMBDash