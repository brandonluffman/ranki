import React, {useState} from 'react'
import { FaCaretUp } from 'react-icons/fa'

const AppDashAnalytics = () => {
  const [googleAnalytic, setGoogleAnalytic] = useState(false);


  return (
<div>
      {googleAnalytic ? (
            <div className='appdash-analytics-tabs'>
            {/* <div className='appdash-analytics-tab appdash-analytic-tab-img flexer'>
              <img src='/google-analytics-long.png' width='50' className='appdash-analytics-img'/>
            </div> */}
    <div className='appdash-analytics-tab'>
    <h6>Users</h6>
    <h6>605</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Unique Users</h6>
    <h6>284</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Website Views</h6>
    <h6>10,045</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Sessions</h6>
    <h6>8,892</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Google Rankings</h6>
    <h6>23</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Backlinks</h6>
    <h6>1,283</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>25</p></div>
  </div>
  </div>
      ): (
        <div className='appdash-analytics-tabs'>

        <div className='full-row-item'>
          <div className='analytics-integrate-fixed'>
            <div className='anti-flexer'>
          <h2>Google Analytics & Search Console have not been integrated, please use our API configuration below to get started.</h2>
          <button type='button' className='integrate-btn btn btn-primary'>Integrate</button>
          </div>
          </div>
          <div className='analytics-tabs-nouser'>
          <div className='appdash-analytics-tab'>
    <h6>Users</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Unique Users</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Website Views</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Sessions</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Google Rankings</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
  <div className='appdash-analytics-tab'>
    <h6>Backlinks</h6>
    <h6>0</h6>
    <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>0</p></div>
  </div>
          </div>
          </div>
          </div>
      )}

  </div>
  )
}

export default AppDashAnalytics