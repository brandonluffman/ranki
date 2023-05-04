import React from 'react'
import Ranking from '../components/Ranking'
import Link from 'next/link'
import {BsPlusCircle} from 'react-icons/bs'
import MiniRank from './MiniRank'
import {MdOutlineArrowRightAlt} from 'react-icons/md'

const LandingCats = (searches) => {
    const se = searches
    const ser = se.searches
    const cards = se.searches.cards
    // console.log(ser)
    // console.log(se.searches[0])

    // ser.map((s, i) => {
    //     if (s.cards.length > 2) {
    //         s.cards.map((c, i) => (
    //             console.log(c)
    //         ))
    //         }
    //         else {
    //             console.log('none')
    //         }
    //     })
  return (
    <div className='landing-categories'>
        <h2 className='landing-cat-header'>Trending Categories</h2>
                {ser.slice(0,3).map((s, index) => (
                    <div className='landing-cont' key={index}>
                        <h2 className='landing-container-query'>{s.query}</h2>
                        <div className='landing-cat'>
                        {s.cards.length > 2 && (
                            s.cards.slice(0,4).map((c, i) => (
                            <div key={i}>
                                 <Link href={`product/${c.id}`} key={c.id}>
                                    <MiniRank products={c} productid={c.id} />
                                </Link>
                            </div>
                            ))
                        )}
                        <Link className='cat-btn-link' href={`/ranking?q=${s.query}`}><button className='cat-btn' type='button'><MdOutlineArrowRightAlt /></button></Link>
                        </div>
                    </div>
                ))}
    </div>
  )
}

export default LandingCats