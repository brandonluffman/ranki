import React from 'react'

const ControlBoard = ({ analysisResult }) => {
  // console.log(analysisResult)
  const {
    'Title': title,
    'Headers': headers,
    'Internal Links': internalLinks,
    'External Links': externalLinks
  } = analysisResult || {};
  return (
    <div className='tech-dash-grid'>
        <div className='tech-grid-item'>
        {title != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
          <h2 className='tech-grid-header'>Title Tag</h2>
          {title && <h3 className='tech-grid-content'>{title}</h3>}
        </div>
        <div className='tech-grid-item'>
        {headers != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
          <h2 className='tech-grid-header'>Headers</h2>
          {headers && <h3 className='tech-grid-content'>{headers}</h3>}
        </div>
        <div className='tech-grid-item'>
        {internalLinks != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
          <h2 className='tech-grid-header'>Internal Links</h2>
          {internalLinks && <h3 className='tech-grid-content'>{internalLinks}</h3>}
        </div>
        <div className='tech-grid-item'>
          {externalLinks != false ? (<div className='green-active'></div>):(<div className='red-active'></div>)}
            <h2 className='tech-grid-header'>Keywords</h2>
            {externalLinks && <h3 className='tech-grid-content'>{externalLinks}</h3>}
          </div>
    </div>
  )
}

export default ControlBoard