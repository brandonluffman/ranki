import Link from 'next/link'
import React from 'react'

const ProductMentions = ({mentions}) => {
    console.log(mentions)
  return (
    <div className='product-mentions-grid-container'>
                <h2 className='product-mentions-header'>Mentioned In</h2>

                {mentions.affiliate.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <Link href={mention.link}><img src={mention.favicon}></img>{mention.link}</Link>
                    </div>
                ))}
            </div>
  )
}

export default ProductMentions