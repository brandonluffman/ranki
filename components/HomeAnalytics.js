import React from 'react'
import {BiTrendingUp} from 'react-icons/bi'
import {BsFillCaretUpFill} from 'react-icons/bs'

const HomeAnalytics = (props) => {
  const prod = props.products
  const ser = props.searches
  // console.log(props)
  return (
    <div className='analytics-containers'>
    <div className='analytics-container'>
      <BiTrendingUp className='trending-icon'/>
      <h2 className='analytics-header'>Trending Searches</h2>
      {ser.slice(0,5).map((s, i) => (
        <div className='analytics-flexer' key={i}>
          <p className='analytics-rank'>{i+1}</p>
          <p className='analytics-text'>{s.query}</p>
          <p className='testing2'><BsFillCaretUpFill className='analytics-caret' /> {s.request_count}</p>
        </div>
      ))}
    </div>
    <div className='analytics-container'>
      <h2 className='analytics-emoji'>🔥</h2>
      {/* <BiTrendingUp className='trending-icon'/> */}
      <h2 className='analytics-header'>Trending Products</h2>
       {prod.slice(0,5).map((p, i) => (
        <div className='analytics-flexer' key={i}>
          <p className='analytics-rank'>{i+1}</p>
          <p className='analytics-text'>{p.entity}</p>
          <p className='testing2'><BsFillCaretUpFill className='analytics-caret' /> {p.request_count}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default HomeAnalytics