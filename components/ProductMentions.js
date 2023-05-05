import Link from 'next/link'
import React from 'react'

const ProductMentions = ({mentions}) => {
    console.log(mentions)
  return (
    <div className='product-mentions-grid-container'>
                <h2 className='product-mentions-header'>Mentioned In</h2>

                {mentions.affiliate.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <img className='product-mentions-grid-links-img' src={mention.favicon}></img>
                        <Link href={mention.link}>{mention.title}</Link>
                    </div>
                ))}
                 {mentions.reddit.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <img className='product-mentions-grid-links-img' src='/reddit.png'></img>
                        <Link href={mention.link}>{mention.title}</Link>
                    </div>
                ))}
                 {mentions.youtube.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <img className='product-mentions-grid-links-img-yt' src='/tube.png'></img>
                        <Link href={mention.link}>{mention.title}</Link>
                    </div>
                ))}
            </div>
  )
}

export default ProductMentions