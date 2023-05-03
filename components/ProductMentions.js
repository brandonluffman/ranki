import Link from 'next/link'
import React from 'react'

const ProductMentions = ({mentions}) => {
  return (
    <div className='product-mentions-grid-container'>
                <h2 className='product-mentions-header'>Mentioned In</h2>

                {mentions.affiliate.map((mention, i) => (
                    <div key={i}>
                        <Link href={mention.link}>{mention.link}</Link>
                    </div>
                ))}
                {/* <div className='product-mentions-grid'>
                     <div className='product-mentions-grid-item'>
                        <div className='product-mentions-grid-score'>
                            <img src='/google.png' width='60'></img>
                        </div>
                        <div className='product-mentions-grid-links'>
                        <div>
                            <img src='/apple.png' width='30'></img>
                            <a href='https://techrdar.com'>The best headphones 2023</a>
                            </div>
                            <div>
                            <img src='/zon.png' width='30'></img>
                            <a href='https://techrdar.com'>The best over-ear headphones 2023</a>
                            </div>
                            <div>
                            <img src='/cnet.png' width='30'></img>
                            <a href='https://techrdar.com'>The best headphones for 2023</a>
                            </div>
                            <div>
                            <img src='/apple.png' width='30'></img>
                            <a href='https://techrdar.com'>Best Headphones for 2023: Top Picks for All Styles</a>
                            </div>
                            <div>
                            <img src='/cnet.png' width='30'></img>
                            <a href='https://techrdar.com'>The 9 Best Headphones - Winter 2023</a>
                        </div>
                        </div>
                    </div>
                 </div> */}
            </div>
  )
}

export default ProductMentions