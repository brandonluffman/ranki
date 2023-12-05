import React from 'react'

const BuyingOption = () => {
  return (
    <div className='flip-card'>
        <div className='flip-card-inner'>
            <div className='flip-card-front'>
                <img className='price-img' src='/bestbuy.png' width='30'></img>
            </div>
            <div className='flip-card-back'>
                <p>$150</p>
            </div>
        </div>
    </div> 
  )
}

export default BuyingOption