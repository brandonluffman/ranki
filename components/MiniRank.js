import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

const MiniRank = ({products}) => {
    const buying_options = products.buying_options
    const entity = products.entity
    const Background = products.product_img
    // const def_img = "/ranki.png"

    // console.log(entity)

    const img_bg = {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: '65%',
        backgroundRepeat: 'no-repeat'
    }

    const img_bg_2 = {
        backgroundImage: `url(/logos/2.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    }

  return (
    <div className='mini-rank-grid'>
        <div className='mini-rank'>
        <div className='mini-flexer'>
            <p className='mini-circle-rank'>{products.rank}</p>
            {products.product_img == 'hello' ? (
                <div className='mini-grid-img-div-2' style={ img_bg_2 }></div>
            ) : (
                <div className='mini-grid-img-div-2' style={ img_bg }></div>
            )   
            }
        </div>
        <div className='mini-grid-entity-reviews'>
            <div className='mini-grid-product-title-div'>
                <h6 className='mini-grid-product-title'>{entity}</h6>
            </div>
            <div className='reviews'>
                <div className='review-stars'>
                <p className='review-rate'>{products.product_rating.slice(0,3)}/5</p>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiFillStar className='review-star'/>
                <AiOutlineStar className='review-star-outline'/>
                </div>
                <div className='review-count'>
                <h3>{products.review_count} Reviews</h3>
                </div>
            </div>
        </div>
    {/* <div className='pricing'>
    {products.buying_options.slice(0,3).map((buying_option, key) => (
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
    }
    </div>      */}
    </div>
</div> 
  )
}

export default MiniRank

// <div className='mini-grid-img-div'>

// {products.product_img == 'hello' ? (
//    <div className='mini-grid-img-div'><img src='/ranki-logo.png' width='10' className='mini-grid-rank-img' alt='Product Ranking Image'></img></div>
// ) : (
//     <div className='mini-grid-img-div'><img src={products.product_img} className='mini-grid-rank-img' alt='Product Ranking Image'></img></div>
// )   
// }
// </div>
