import Link from 'next/link'
import React from 'react'
import {BiTrendingUp} from 'react-icons/bi'
import {BsFillCaretUpFill} from 'react-icons/bs'

const HomeAnalytics = (props) => {
  const prod = props.products
  const ser = props.searches
  console.log(prod)
  console.log(ser)
  return (
    <div className='analytics-containers'>
    <div className='analytics-container'>
      <BiTrendingUp className='trending-icon'/>
      <h2 className='analytics-header'>Trending Searches</h2>
      {ser && ser.slice(0,5).map((s, i) => (
        <div className='analytics-flexer' key={i}>
          <p className='analytics-rank'>{i+1}</p>
          <Link href={`/ranking?q=${s}`} key={s.id}>
          <p className='analytics-text'>{s.query}</p>
          </Link>
          <p className='testing2'><BsFillCaretUpFill className='analytics-caret' /> {s.request_count}</p>
        </div>
      ))}
    </div>
    <div className='analytics-container'>
      <h2 className='analytics-emoji'>🔥</h2>
      {/* <BiTrendingUp className='trending-icon'/> */}
      <h2 className='analytics-header'>Trending Products</h2>
       {prod && prod.slice(0,5).map((p, i) => (
        <div className='analytics-flexer' key={i}>
          <p className='analytics-rank'>{i+1}</p>
          <Link href={`product/${p.id}`} key={p.id}>
          <p className='analytics-text'>{p.entity}</p>
          </Link>
          <p className='testing2'><BsFillCaretUpFill className='analytics-caret' /> {p.request_count}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default HomeAnalytics