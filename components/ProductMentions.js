import Link from 'next/link'
import React from 'react'

const ProductMentions = ({mentions}) => {
    // console.log(mentions)
  return (
    <div className='product-mentions-grid-container'>
                <h2 className='product-mentions-header'>Mentioned In</h2>

                {mentions.affiliate.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <div className='product-menions-img-bubble'>
                            <img className='product-mentions-grid-links-img' src={mention.favicon}></img>
                        </div>
                        <div className='product-mentions-text-div'>
                        <Link className='product-mentions-link' href={mention.link}>{mention.title}</Link>
                        {mention.instances && <p className='product-mentions-instance'>&ldquo; {mention.instances[0]} &ldquo;</p>}
                        </div>
                        {/* <Link href={mention.link}>{mention.instances[0]}</Link> */}
                    </div>
                ))}
                 {mentions.reddit.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <img className='product-mentions-grid-links-img' src='/reddit.png'></img>
                        <Link href={mention.link}>{mention.title}</Link>
                        {mention.instances && <p className='product-mentions-instance'>&ldquo; {mention.instances[0]} &ldquo;</p>}
                    </div>
                ))}
                 {mentions.youtube.map((mention, i) => (
                    <div className='product-mentions-grid-links' key={i}>
                        <img className='product-mentions-grid-links-img-yt' src='/tube.png'></img>
                        <Link href={mention.link}>{mention.title}</Link>
                        {mention.instances && <p className='product-mentions-instance'>&ldquo; {mention.instances[0]} &ldquo;</p>}
                    </div>
                ))}
            </div>
  )
}

export default ProductMentions