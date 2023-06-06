import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

const Ranking = ({products}) => {
    const buying_options = products.buying_options
    const entity = products.entity
    const Background = products.product_img
    
    const img_bg = {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }
    const img_bg_2 = {
        backgroundImage: `url(/logos/1.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }
    if (products.product_rating) {
    // console.log((parseInt(products.product_rating)/5))
    } else {
    }

  return (
    <div className='grid-item'>
        <div className='flexer'>
            {/* <p className='circle-rank'>{products.rank}</p> */}
            {products.product_img == 'hello' ? (
                <div className='grid-img-div' style={ img_bg_2 }></div>
            ) : (
                <div className='grid-img-div' style={ img_bg }></div>
            )   
            }
        </div>
    <div className='grid-entity-reviews'>
        <div className='grid-product-title-div'>
            <h6 className='grid-product-title'>{entity}</h6>
        </div>
        {/* <div className='test-div' style={{width: `((parseInt(products.product_rating)/5)*100)%`, height:'200px', backgroundColor: 'blue'}}></div> */}
        <div className='reviews'>
            <div className='review-stars'>
                <p className='review-rate'>{products.product_rating}/5</p>
                <div className='review-stars-div'>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiOutlineStar className='review-star-outline'/>
                </div>
            </div>
            <div className='review-count'>
                <h3>{products.review_count} Reviews</h3>
            </div>
        </div>
    </div>
    <div className='pricing'>
    {/* {products.buying_options.slice(0,3).map((buying_option, key) => (
        <div className='flip-card' key={key}>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>
            <img className='price-img' src='/zon.png' width='30'></img>
            </div>
            <div className='flip-card-back'>
                <p>$150</p>
             </div>
             </div>
        </div>   
    ))}
    {buying_options.length > 3 ? (
        <div className='buying_options_more_link'>{(buying_options.length)-3}+</div>):(
            <div></div>
        )
    } */}
    </div>     
</div> 
  )
}

export default Ranking
