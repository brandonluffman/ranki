import React from 'react'

const AbsoluteLoading = () => {
  return (
    // <div className='loading-container'>
    //   <div>
    //     <div className='loading-hidden'></div>
    //     {/* <p className='loading-text'>This may take up to 15 seconds</p> */}
    //     </div>
    // </div>
    <div className='absolute-lds-container absolute-loading-container'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
  )
}

export default AbsoluteLoading