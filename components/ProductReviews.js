import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'


const ProductReviews = ({prod}) => {
    const count = prod.ratings_count
    const sentiment = prod.sentiment
    const [isActive, setActive] = useState(false);
    console.log(prod)
    const toggleClass = () => {
        setActive(!isActive);
    };
    console.log(count)
    const searchText = 'positive'

  return (
    prod ? (
        <div className='product-reviews-div'> 
        <div className='product-review-listings'>
        <h2 className='prod-review-header'>Online Reviews</h2>
           <div className='product-desc-reviews-section'>
               <div className='product-desc-reviews-numbers'>
                   <p className='review-rate rate-listing'>{prod.product_rating}</p>
                   <div className='product-review-stars'>
                       <div>
                           <AiFillStar className='review-star review-star-listing'/>
                           <AiFillStar className='review-star review-star-listing'/>
                           <AiFillStar className='review-star review-star-listing'/>
                           <AiFillStar className='review-star review-star-listing'/>
                           <AiOutlineStar className='review-star-outline review-star-listing' />
                       </div>
                       <div className='review-count review-count-listing'>
                           <h3>{prod.review_count} Reviews</h3>
                       </div>
                   </div>
               </div>
          
               <div className='product-desc-reviews-stars'>
                   <div className='product-stars-bubbles'>
          
                       {/* {Object.entries(count).reverse().map(([key, value]) => (
                           <div className='product-star-bubble' key={key}>
                               <p className='star-bubble-num'>{key.slice(0,1)}</p>
                               <AiFillStar className='test-star'/>
                               <div className='star-bubble'><div className='star-bubble-fill' style={{ width: 20+ (value/prod.review_count)*100, height: '20px' }}></div></div>
                               <p className='hidden-val'>{value} of {prod.review_count}</p>
                           </div>
                       ))}        */}

                    {count.map((review, index) => {
                        const key = Object.keys(review)[0];
                        const value = Object.values(review)[0];
                        return (
                            <div className='product-star-bubble' key={key}>
                               <p className='star-bubble-num'>{key.slice(0,1)}</p>
                               <AiFillStar className='test-star'/>
                               <div className='star-bubble'><div className='star-bubble-fill' style={{ width: 20+ (value/prod.review_count)*100 + 30, height: '20px' }}>{value}</div></div>
                               <p className='hidden-val'>{value} of {prod.review_count}</p>
                           </div>
                        );
                    })}
                   </div>
                   </div>
               </div>
       
           <div className='product-reviews-pro-con'>
               <div className='product-review-pros'>
               <h2 className='product-reviews-pros-header'>Top Pros</h2>
               <div className='pros-grid'>
               {/* {sentiment.map((sent, index) => (
                   sent.favor_rating.includes(searchText) && (
                       <div key={index}>
                       <p className='product-reviews-pro positive-sent'><span className='testing3'>{sent.desc}</span> <span className='testing4'>({sent.favor_vote_count})</span></p>
                       </div>
                   )
               ))} */}
                    {sentiment.map((review, index) => {
                        
                        const key = Object.keys(review)[0];
                        const value = Object.values(review)[0];
                        const value2 = Object.values(review)[1];
                        const value3 = Object.values(review)[2];
                        console.log(value2)
                        return (
                        value2 == searchText && (
                        <div key={index}>
                            <p className='product-reviews-pro positive-sent'>{value} <span className='testing4'>({value3})</span></p>
                        </div>
                        )
                        );
                    })}
               </div>
               </div>
               <div className='product-review-pros'>
               <h2 className='product-reviews-pros-header'>Top Cons</h2>
               <div className='pros-grid'>
               {sentiment.map((review, index) => {
                        
                        const key = Object.keys(review)[0];
                        const value = Object.values(review)[0];
                        const value2 = Object.values(review)[1];
                        const value3 = Object.values(review)[2];
                        console.log(value2)
                        return (
                        value2 != searchText && (
                        <div key={index}>
                            <p className='product-reviews-pro positive-sent'>{value} <span className='testing4'>({value3})</span></p>
                        </div>
                        )
                        );
                    })}
               </div>
               </div>
           </div>
            {/* {reviews.map((review, i) => (
               <div className='product-review-listing' key={i}>
               <h4 className='product-review-title'>{review.title}</h4>
               <div className='product-review-stars'>
                    <p className='product-review-rating'>4.1 / 5</p>
                   <AiFillStar className='review-star'/>
                   <AiFillStar className='review-star'/>
                   <AiFillStar className='review-star'/>
                   <AiFillStar className='review-star'/>
                   <AiOutlineStar className='review-star-outline' />
               </div>
               <p className={isActive ? 'product-review-text-long':'product-review-text'}>{review.content}</p><button type='button' onClick={toggleClass} className='more-btn'>More</button>
               <p className='product-review-source'>{review.source} &#8226; <span className='product-review-source-date'>{review.date}</span></p>
           </div>
           ))}  */}
            {/* <div className='review-pagination'>
               <a className='pagination-state'>1</a>
               <a>2</a>
               <a>3</a>
               <a>4</a>
               <a>5</a>
           </div> */}
       </div>
   </div>
    ):(
            <div>No Products</div>
        )

  )
}

export default ProductReviews