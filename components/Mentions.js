import Link from 'next/link'
import React from 'react'

const Mentions = (results) => {
    // console.log(results)

  return (
    <div>
    <div className='query-boxes'>
        <div className='mentions-container'>
            <div className='mentions-top-div'>
                <div className='mentions-favicon-bubble'>
                <img src='/google.png' className='mentions-img'></img>
                </div>
                <h2>Mentions</h2>
            </div>
            <div className='mentions-link-container'>     
                {results.results.links.affiliate.slice(0,10).map((l,i) => (
                    <div className='mentions-link-div' key={i}>
                    <div className='favicon-bubble'><img src={l.favicon} width='25' className='mentions-link-img'></img></div><Link href={l.link} target='_blank' rel='no-referrer'><p className='mentions-links-link'>{l.title}</p></Link>
                    </div>
                ))}
            </div>
        </div>
        <div className='mentions-container'>
            <div className='mentions-top-div'>
                <div className='mentions-favicon-bubble'>
                <img src='/reddit.png' className='mentions-img'></img>
                </div>
                <h2>Mentions</h2>
            </div>
            <div className='mentions-link-container'>     
                {results.results.links.reddit.map((l,i) => (
                    <div className='mentions-link-div' key={i}>
                    <div className='favicon-bubble'><img src={l.favicon} width='25' className='mentions-link-img'></img></div><Link href={l.link} target='_blank' rel='no-referrer'><p className='mentions-links-link'>{l.title}</p></Link>
                    </div>
                ))}
            </div>
        </div>
        <div className='mentions-container'>
            <div className='mentions-top-div'>
                <div className='mentions-favicon-bubble'>
                <img src='/tube.png' className='mentions-img'></img>
                </div>
                <h2>Mentions</h2>
            </div>
            <div className='mentions-link-container'>     
                {results.results.links.youtube.map((l,i) => (
                    <div className='mentions-link-div' key={i}>
                    <div className='favicon-bubble'><img src='/tube.png' width='30' className='yt-img'></img></div><Link href={l.link} target='_blank' rel='no-referrer'><p className='mentions-links-link'>{l.title}</p></Link>
                    </div>
                ))}
            </div>
        </div>
        </div>

        {/* <h2 className='mentions-ranks-header'>Rankings</h2>
        <div className='mentions-ranks'>
            <div className='rank-grid'>
                <p>Hello</p>
            </div>     
        </div> */}
        </div>
  )
}

export default Mentions

            {/* {cardslim.map((product, i) => (
                <div className='mention-rank-div' key={i}>
                <h3 className='mention-rank-rank'></h3>
                <img src={product.product_img} className='mention-rank-img'></img>
                <h2 className='mention-rank-title'>{product.entity}</h2>
                </div>
            ))} */}