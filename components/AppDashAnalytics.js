import React, {useState} from 'react'
import { FaCaretUp } from 'react-icons/fa'
import { FaUser } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { CiViewBoard } from "react-icons/ci";
import { FaShieldAlt } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { MdAdsClick } from "react-icons/md";
import { SiConvertio } from "react-icons/si";

const AppDashAnalytics = () => {
  const [googleAnalytic, setGoogleAnalytic] = useState(true);


  return (
<div>
      {googleAnalytic ? (
            <div className='appdash-analytics-tabs'>
            {/* <div className='appdash-analytics-tab appdash-analytic-tab-img flexer'>
              <img src='/google-analytics-long.png' width='50' className='appdash-analytics-img'/>
            </div> */}
    <div className='appdash-analytics-tab'>
      <div className='analytics-icon-container'>
      <FaUser className='analytics-icon' />
        </div>
    <h6>Users</h6>
    <h6>605 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>256</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
        <FaUserCheck className='analytics-icon' />
        </div>
    <h6>Unique Users</h6>
    <h6>284 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>103</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <CiViewBoard className='analytics-icon' />
        </div>
    <h6>Website Views</h6>
    <h6>10,045 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>1,279</p></div></h6>
   
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <FaShieldAlt className='analytics-icon' />
        </div>
    <h6>Domain Authority</h6>
    <h6>82 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>3</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <FaMedal className='analytics-icon' />
        </div>
    <h6>Google Rankings</h6>
    <h6>23 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>5</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <CiLink className='analytics-icon' />
        </div>
    <h6>Backlinks</h6>
    <h6>1,283 <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>183</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <MdAdsClick className='analytics-icon' />
        </div>
    <h6>Click-Through Rate</h6>
    <h6>23% <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>2%</p></div></h6>
  </div>
  <div className='appdash-analytics-tab'>
  <div className='analytics-icon-container'>
  <SiConvertio className='analytics-icon' />
        </div>
    <h6>Conversion Rate</h6>
    <h6>3.5% <div className='flexer analytics-flexer'><FaCaretUp className='caret-icon'/><p>.02%</p></div></h6>
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