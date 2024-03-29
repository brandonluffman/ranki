import React, { useState, useEffect, useContext, useRef } from 'react';
import GaugeChartComponent from './GaugeChartComponent';
import Link from 'next/link';
import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { BsArrowLeft, BsArrowRight, BsCaretUp } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';
import {IoMdAdd, IoMdClose} from 'react-icons/io'
import DashContent from './DashContent';
import { supabase } from '../utils/supabaseClient'; // Import your initialized Supabase client
import AppDashAnalytics from './AppDashAnalytics';
import GMBDash from './GMBDash';
import Breadcrumbs from './Breadcrumbs';
import { UserContext } from '../context/UserContext';
import appOptions from '../public/appOptions'
import IntegrateDropdown from './IntegrateDropdown'
import BlogDash from './BlogDash';
import AddBlogOfficial from './AddBlogOfficial';
import Keywords from './Keywords';
import KeywordDash from './KeywordDash';


const Dashboard = ({slugId}) => {
    const router = useRouter();
    const { slug } = router.query;
    const [app, setApp] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [integratedApps, setIntegratedApps] = useState([]);
    const [appName, setAppName] = useState('');
    const [seo, setSEO] = useState(null);
    const [score, setScore] = useState(null); // Example score
    const [score2, setScore2] = useState(null); // Example score
    const [score3, setScore3] = useState(97); // Example score
    const [editingApp, setEditingApp] = useState(true);
    const [appIntegrate, setAppIntegrate] = useState(false);
    const { user, login, logout } = useContext(UserContext);
    const formRef = useRef(null);
    const domain = app ? 'https://' + app.domain: null;
    const [siteUrls, setSiteUrls] = useState([]);
  const [visible, setVisible] = useState(false);
  const [keywords, setKeywords] = useState(['testing', 'test2']);
  const appLogo = '/chatbot.png'

    const handleAppSelection = (selectedApp) => {
      setSelectedValue(selectedApp.name);
  };

    const toggleSide = () => {
      setEditingApp(prevState => !prevState);
    };
    const closeSide = () => {
      setEditingApp(prevState => !prevState);

    };
  
    const handleChange = (event) => {
        const domain = event.target.options[event.target.selectedIndex].getAttribute('data-domain');
        setSelectedValue(event.target.value);
        setSelectedDomain(domain);
    };

    const toggleAppIntegrate = () => {
      setAppIntegrate(prevState => !prevState);
    }

    const handleUpdate = (event) => {
      setSelectedValue(event.target.value);
    }; 
 

    const handleVisibility = (event) => {
     setVisible(prevState => !prevState)
  };
    
   
  useEffect(() => {
      const actualSlug = slug || slugId;
      if (actualSlug) {
        console.log('Actual Slug Found')
          // Fetch the specific app details
          fetchAppName(actualSlug);

          // Fetch integrated apps for this specific app
          fetchIntegratedApps(actualSlug);
      } else {
      console.log('None Found')
      }
  }, [slug, slugId]);

  const fetchAppName = async (appSlug) => {
    // const cachedApp = localStorage.getItem(`appDetails_${appSlug}`);
        try {
            const { data, error } = await supabase
                .from('apps')
                .select('*')
                .eq('id', appSlug)
                .single();

            if (error) throw error;
            setApp(data);
            localStorage.setItem(`appDetails_${appSlug}`, JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching app details:', error);
        }
    
};

const fetchIntegratedApps = async (appSlug) => {
      try {
          const { data, error } = await supabase
              .from('apps')
              .select('integrated_apps')
              .eq('id', appSlug);
          if (error) throw error;
          setIntegratedApps(data[0].integrated_apps);
          localStorage.setItem(`integratedApps_${appSlug}`, JSON.stringify(data[0].integrated_apps));
          // console.log('Fetched integrated?')
      } catch (error) {
          console.error('Error fetching integrated apps:', error);
      }
  // }
};



const handleSubmit = async (event) => {
  event.preventDefault();
  const actualSlug = slug || slugId;

  const appName = selectedValue; // The name of the selected app
  const appUrl = formRef.current.url.value; // The URL entered by the user

  // Find the selected app in appOptions to get its imgSrc
  const selectedApp = appOptions.find(app => app.name === appName);
  const imgSrc = selectedApp ? selectedApp.imgSrc : '/path-to-default-image.png';
  const formattedUrl = appUrl.slice(0, 4) !== 'http' ? 'https://' + appUrl : appUrl;


  // Construct the new app object
  const newApp = {
    name: appName,
    url: formattedUrl,
    imgSrc: imgSrc // Use the imgSrc from the selected app
  };

  // Make sure integratedApps is an array
  const currentApps = Array.isArray(integratedApps) ? integratedApps : [];

  // Update the integratedApps state
  const updatedApps = [...currentApps, newApp];
  setIntegratedApps(updatedApps);

  // Update the apps table in Supabase
  try {
    const { error } = await supabase
      .from('apps')
      .update({ integrated_apps: updatedApps }) // Use the updatedApps array
      .eq('id', actualSlug);

    if (error) {
      console.error('Error updating app:', error);
    } else {
      localStorage.setItem('integratedApps', JSON.stringify(updatedApps));
      // setAppIntegrate(false)
    }
  } catch (error) {
    console.error('Error updating app:', error);
  }
};




  const deleteApp = async (indexToDelete) => {
    const actualSlug = slug ? slug : null;

    const updatedApps = integratedApps.filter((_, index) => index !== indexToDelete);
    setIntegratedApps(updatedApps);

    const { data, error } = await supabase
        .from('apps')
        .update({ integrated_apps: updatedApps }) // Update the column with the new list
        .eq('id', actualSlug); // Use the appropriate identifier for the app
      
    localStorage.setItem('integratedApps', JSON.stringify(updatedApps));

    if (error) {
        console.error('Error updating app:', error);
    }
};


  return (
    <>
    {user?.id ? (
      <div className='dashboard-container'>
        <Breadcrumbs appName={appName} slugId={slug} />
        <button onClick={toggleSide} type='button' className='appdash-side-btn'>Toggle Apps</button>
        <div className={editingApp ? 'toggle-side-container' : 'toggle-side-ns'}>
          <button onClick={closeSide} className='side-close'><IoMdClose /></button>
          <div className='toggle-side-grid'>
            {/* Ensure you have a valid src or provide a placeholder if the image is dynamic */}
            <div className='side-grid-item'><img src='/path/to/your/image.jpg' alt='Description' className='side-img' /></div>
          </div>
        </div>
        {app && (
          <a href={app.domain} rel='noreferrer' target='_blank' className='appdash-external-btn'>
            <BiLinkExternal />
          </a>
        )}
        <div className='anti-flexer dash-flexer'>
          {app && <img src={appLogo} className='appdash-grid-img dashboard-grid-img' alt={`${app.name} logo`} />}
          {app && <h2 className='dashboard-header appdash-header'>{app.name}</h2>}
          {user && <DashContent slug={slug} length={3} />}
            {/* <div className='dashboard-grid seo-dash-grid'>
            <Link href={`/seo/${slug}`} className='seo-dash-link'>
              <div className='seo-dash-item'>
              <h2>SEO</h2>

                <GaugeChartComponent id="gauge-chart3" width='300' percent={score3} className='seo-dash-chart'/>
              </div>
              </Link>
            </div> */}
     
        </div>
      </div>
    ) : (
      <div className='no-user-container'>
        <div className='anti-flexer'>
          <h3 className='no-user-header'>Project Dashboard</h3>
          <Link href='/login'>
            <button type='button' className='login-btn btn btn-primary'>Login</button>
          </Link>
        </div>
      </div>
    )}
  </>
  )
    }

export default Dashboard;









        {/* <Link href='https://vercel.com/brandonluffman/venum' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/vercel.png' width='50'></img></div></Link>
        <Link href='https://proton.me/' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/proton.png' width='50'></img></div></Link>
        <Link href='https://search.google.com/search-console?utm_source=about-page&resource_id=sc-domain:ranki.ai' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/google.png' width='50'></img></div></Link>
        <Link href='https://ap.www.namecheap.com/' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/namecheap.png' width='50'></img></div></Link>
        <Link href='https://supabase.com/dashboard/project/gnbnxykwoaijcalzbtbs' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/supabase.png' width='50'></img></div></Link>
        <Link href='https://dashboard.stripe.com/test/dashboard' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/stripe.png' width='50'></img></div></Link>
        <Link href='https://github.com/brandonluffman?tab=repositories' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/github.png' width='50'></img></div></Link>
        <Link href='https://analytics.google.com/analytics/web/?authuser=0#/provision/SignUp' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/google-analytics.png' width='50'></img></div></Link>
        <Link href='https://dashboard.heroku.com/apps' rel='noreferrer' target="_blank"><div className='appdash-health-tab fancy'><img src='/heroku.png' width='50'></img></div></Link> */}



              {/* <div className='appdash-authority'>
    <h6>Domain Authority</h6>
    <h6>32</h6>
  </div> */}
      {/* <div className='flexer appdash-alerts'>
        <div className='appdash-alert-container critical-alert-container'><h6>Critical</h6>
        <h6>0</h6></div>
        <div className='appdash-alert-container warning-alert-container'><h6>Warnings</h6> <h6>2</h6></div>
      </div> */}



              {/* <Link href={`/dashboard/seo/${slug}`}>
        <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>Technical SEO</h2>
            <GaugeChartComponent id="gauge-chart1" percent={score} width="250px" />
        </div>
        </Link>
   
            <Link href={`/dashboard/seo/${slug}`}>
            <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>On-Page SEO</h2>
            <GaugeChartComponent id="gauge-chart2" percent={score2} width="250px"/>
            </div>
            </Link>
     
              <Link href={`/dashboard/seo/${slug}`}>
            <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>Off-Page SEO</h2>
            <GaugeChartComponent id="gauge-chart3" percent={score3} width="250px"/>
            </div>
            </Link> */}



              // const cachedApps = localStorage.getItem(`integratedApps_${appSlug}`);
  // console.log(cachedApps)
  // if (cachedApps !== null && cachedApps !== 'null') {
  //     setIntegratedApps(JSON.parse(cachedApps));
  //     console.log('Found cached apps')
  //     console.log(cachedApps)
  // } else {




      // if (cachedApp) {
    //   console.log('Found the cached app')
    //     setApp(JSON.parse(cachedApp));
    // } else {







    /* SEO DASHBOARD */


//     {user?.email != 'brandonluff10@gmail.com' ? (
//       <div className='dashboard-grid seo-dash-grid'>
//        {/* <Link  className='seo-dash-link' href={`/dashboard/seo/${slug}`}> */}

//       <div className='seo-dash-item'>
//        <div className='seo-dash-glass'><div className='seo-dash-flexer flexer'><div className='anti-flexer'>
//          <p className='seo-glass-p'>Upgrade your account to view SEO analytics</p>
//          <Link href='/pricing'><button className='btn btn-primary btn-margin'>Upgrade Account</button></Link>
//          </div></div></div>
//          <div className='seo-dash-content-container'>
//       <h2>SEO</h2>
//       {app?.technical_analysis ? (<GaugeChartComponent id="gauge-chart3" percent={((app.technical_analysis['Truthy Values Count'])/16)*100} width="200px" className='seo-dash-chart'/>):(<GaugeChartComponent id="gauge-chart3" percent={score3} width="200px" className='seo-dash-chart'/>)}
//        </div>
//       {/* {app?.seo_score ? (<GaugeChartComponent id="gauge-chart3" percent={app.technical_analysis['Truthy Values Count']} width="300px" className='seo-dash-chart'/>):(<GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>)} */}
//       </div>
//       {/* </Link> */}
//    </div>

// ):(
//  <div className='dashboard-grid seo-dash-grid'>
//                    <Link  className='seo-dash-link' href={`/dashboard/seo/${slug}`}>

//  <div className='seo-dash-item'>
//  <h2>SEO</h2>
//  <GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>
//  </div>
//      <div className='analytics-integrate-fixed analytics-integrate-fixed-noglass'>
//    <div className='anti-flexer'>
//  {/* <h2 className='seo-integrate-header'>SEO has not been configured for your site, get started with a test.</h2>
//  {app ? <Link href={`/dashboard/seo/${app.id}`}><button type='button' className='integrate-btn btn btn-primary'>Test SEO</button></Link>:(<button type='button' className='integrate-btn btn btn-primary'>Test SEO</button>)} */}
//  </div>
//  </div>
//  {/* <Link href={`/dashboard/technical/${app.id}`}> */}
//  {/* <div className='dashboard-grid-item'>
//      <h2 className='dashboard-grid-header'>Technical SEO</h2>
//      <GaugeChartComponent id="gauge-chart1" percent={score} width="250px" />
//  </div> */}
//  {/* </Link> */}
 
// {/* <Link href={`/dashboard/onpage/${app.id}`}> */}
//  {/* <div className='dashboard-grid-item'>
//  <h2 className='dashboard-grid-header'>On-Page SEO</h2>
//  <GaugeChartComponent id="gauge-chart2" percent={score2} width="250px"/>
//  </div> */}
//  {/* </Link>
   
//  <Link href={`/dashboard/offpage/${app.id}`}> */}
//  {/* <div className='dashboard-grid-item'>
//  <h2 className='dashboard-grid-header'>Off-Page SEO</h2>
//  <GaugeChartComponent id="gauge-chart3" percent={score3} width="250px"/>
//  </div> */}
//  {/* </Link> */}
//  </Link>
//  </div>
 
// )}





/* Integrated Apps */

      {/* {integratedApps && integratedApps.length > 0 ? ( 

      <div className='appdash-health-tabs'>

                {integratedApps.map((app, index) => (
                    <div key={index} className='integrated-div'>
                        <Link href={app.url} rel='noreferrer' target="_blank">
                            <div className='appdash-health-tab fancy'>
                                <img src={app.imgSrc} width='50' alt={`App ${index}`} />
                            </div>
                        </Link>
                        <button onClick={() => deleteApp(index)} className="delete-integrated-btn">
                            <IoMdClose />
                        </button>

                    </div>
                    
                ))}
                  <div className='appdash-health-tab fancy health-tab-add' onClick={toggleAppIntegrate}><IoMdAdd /></div>

              
           
           </div>
              ):(
                <div className='appdash-health-tabs'>
                <div className='integrated-div'>
                    <Link href='https://google.com' rel='noreferrer' target="_blank" className='integrated-link'>
                        <div className='appdash-health-tab fancy'>
                            <img src='/website-icon.png' width='50' alt='Integrated App' />
                            <button onClick={() => deleteApp(index)} className="delete-integrated-btn">
                                <IoMdClose />
                            </button>
                        </div>   
                    </Link>
                  </div>
                  <div className='appdash-health-tab non-fancy'>
                  </div>
                  <div className='appdash-health-tab non-fancy'>
                  </div>
                  <div className='appdash-health-tab fancy health-tab-add' onClick={toggleAppIntegrate}><IoMdAdd /></div>
               </div>
       
              )}


                  {appIntegrate && (
                  <div className='app-integrate-container'>
                      <button onClick={toggleAppIntegrate} className='side-close'><IoMdClose /></button>
                      <h3 className='app-integrate-header'>Integrate Your App</h3>
                      <form className='app-integrate-form' ref={formRef} onSubmit={handleSubmit}>
                        <IntegrateDropdown options={appOptions} onOptionSelected={handleAppSelection} />
                        <div className='app-integrate-div'>
                          <input type="text" name="url" placeholder="URL" className='app-integrate-input' />
                        </div>
                        <button type="submit" className='btn btn-tertiary integrate-btn'>Integrate App</button>
                      </form>
                  </div>
                   )} */}