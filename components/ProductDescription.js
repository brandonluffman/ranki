import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Link from 'next/link'
import ProductReviews from './ProductReviews'
import ProductMentions from './ProductMentions'

const ProductDescription = (product) => {
    const [isActive, setActive] = useState(false);
    const prod = product.product
    const buying_options = product.product.buying_options
    // const reviews = product.product.reviews
    const product_specs = prod.product_specs

    const toggleClass = () => {
    setActive(!isActive);
    };

    // console.log(prod)

    // console.log(product_specs.length != 0)
  return (
    <div className='product-desc-container'>
         <div className='product-desc-top-container'>
            <div className='product-desc-stats'>
                <img src={prod.product_img} width='400'></img>
                <div className='ghost-div'>
                    <div className='product-desc-top-cont'>
                        <div className='product-desc-top-left'>
                            <h2 className='product-desc-title'>{prod.entity}</h2>
                            <div className='product-desc-reviews'>
                                <div className='review-stars prod-desc-review-stars'>
                                    <p className='review-rate'>{prod.product_rating} / 5</p>
                                    <AiFillStar className='review-star'/>
                                    <AiFillStar className='review-star'/>
                                    <AiFillStar className='review-star'/>
                                    <AiFillStar className='review-star'/>
                                    <AiOutlineStar className='review-star-outline'/>   
                                </div>
                                <div className='review-count'>
                                    <h3>{prod.review_count} Reviews</h3>
                                </div>
                            </div>
                        </div>
                        {/* <div className='product-desc-top-right'>
                             <div className='product-desc-other-rank'>
                                <h3>#3</h3>
                                <p>Best Over Ear Headphones</p>
                            </div>
                            <div className='product-desc-other-rank'>
                                <h3>#3</h3>
                                <p>Best Over Ear Headphones</p>
                            </div> 
                         </div> */}
                    </div>
                    <h3 className='product-desc-description'>{prod.product_description}</h3>
                    <div className='product-desc-pricing'>
                        {/* {buying_options.map((buying_option, i) => (
                            <Link className='product-desc-price' href={buying_option} target='_blank' rel='noreferrer' key={i}>
                            <img src='/zon.png' width='30'></img>
                            <p>$150</p>
                            </Link>
                        ))} */}
                    </div>
                    </div>
                      {/* <div className='product-desc-specs'>
                        <h2 className='product-specs-header'>Product Specs</h2>
                        {product_specs.length != 0 && (
                            product_specs.map((obj) => {
                        return Object.entries(obj).map(([key, value]) => {
                            return <div className='spec-kv-div' key={key}><p className='kv-p'>{key}</p> <p className='kv-p'>{value}</p></div>;
                        });
                        }))}
                        
                     </div> */}
                     </div>
            </div>
        <div className='product-desc-content-container'>
            <ProductReviews prod={prod}/>
            <ProductMentions mentions={prod.mentions}/>
        </div>
        {/* <h3 className='related-header'>Related Products</h3> */}
        {/* <div className='related-products'>
            <Ranking products={products} />
        </div>  */}
    </div>
  )
}

export default ProductDescription
