import React, { useState, useEffect, useContext, useRef } from 'react';
import GaugeChartComponent from './GaugeChartComponent';
import Link from 'next/link';
import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { BsArrowLeft, BsCaretUp } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';
import {IoMdAdd, IoMdClose} from 'react-icons/io'
import DashContent from './DashContent';
import RadialGuage from './RadialGuage';
import {FaCaretUp} from 'react-icons/fa'
import { supabase } from '../utils/supabaseClient'; // Import your initialized Supabase client
import AppDashAnalytics from './AppDashAnalytics';
import GMBDash from './GMBDash';
import Breadcrumbs from './Breadcrumbs';
import { UserContext } from '../context/UserContext';
import appOptions from '../public/appOptions'
import IntegrateDropdown from './IntegrateDropdown'
import BlogDash from './BlogDash';
import AddBlogOfficial from './AddBlogOfficial';
import Loading from './Loading';


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
    const [score3, setScore3] = useState(null); // Example score
    const [editingApp, setEditingApp] = useState(true);
    const [appIntegrate, setAppIntegrate] = useState(false);
    const { user, login, logout } = useContext(UserContext);
    const formRef = useRef(null);
    const domain = app ? 'https://' + app.domain: null;
    const [siteUrls, setSiteUrls] = useState([]);
  const [visible, setVisible] = useState(false);


  /* Generate */ 
  // const { user } = useContext(UserContext);
  
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("Professional");
  const [generatedBios, setGeneratedBios] = useState("");
  const [tone, setTone] = useState('Professional');
  const [wordCount, setWordCount] = useState(0);
  const [articleKeywords, setArticleKeywords] = useState([]);
  const [globalArticleCount, setGlobalArticleCount] = useState(256475);
  const [userCredits, setUserCredits] = useState(0);
  const MAX_VALUE = 100;



    const handleAppSelection = (selectedApp) => {
      // Update the state or perform any action required when an app is selected
      setSelectedValue(selectedApp.name);
      // ... other actions based on selected app ...
  };

    const toggleSide = () => {
      setEditingApp(prevState => !prevState);
      // console.log(editingApp)
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
          // Fetch the specific app details
          fetchAppName(actualSlug);

          // Fetch integrated apps for this specific app
          fetchIntegratedApps(actualSlug);
      }
  }, [slug, slugId]);

  const fetchAppName = async (appSlug) => {
    const cachedApp = localStorage.getItem(`appDetails_${appSlug}`);
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
    }
  } catch (error) {
    console.error('Error updating app:', error);
  }
};



  


  useEffect(() => {
    const fetchSiteUrls = async () => {
        try {
            const response = await supabase
                .from('site_urls')
                .select('*')
                .eq('app_id', slug);

            if (response.data) {
                setSiteUrls(response.data);
            }
        } catch (error) {
            console.error('Error fetching site URLs:', error);
        }
    };

    fetchSiteUrls();
}, [slug]);




  const deleteApp = async (indexToDelete) => {
    const actualSlug = slug ? slug : null;

    const updatedApps = integratedApps.filter((_, index) => index !== indexToDelete);
    setIntegratedApps(updatedApps);

    // Update the database if neededa
    // Assuming you have a column 'integrated_apps' in your 'apps' table
    const { data, error } = await supabase
        .from('apps')
        .update({ integrated_apps: updatedApps }) // Update the column with the new list
        .eq('id', actualSlug); // Use the appropriate identifier for the app
      
    localStorage.setItem('integratedApps', JSON.stringify(updatedApps));

    if (error) {
        console.error('Error updating app:', error);
    }
};



/* generate */


const prompt = `Generate an SEO optimized article about ${bio} in HTML Code Format with a max of ${wordCount} words. The tone of the article will be ${vibe}`;
  
const handleValueChange = (event) => {
  const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue <= MAX_VALUE) {
      setWordCount(newValue);
  }
};

// getUserCredits(user.id).then(credits => {
//   setUserCredits(credits);
// });

const handleFetchCredits = async () => {
const credits = await getUserCredits(user.id);
setUserCredits(credits);
};
const generateBio = async (e) => {
  e.preventDefault();
  setGeneratedBios("");
  setLoading(true);

  try {
    const hasCredits = await checkUserCredits(user.id);
    // console.log('User has credits:', hasCredits); // Debugging log
    if (!hasCredits) {
      alert('You do not have enough credits to generate a bio.');
      setLoading(false);
      return;
    } else {
        // console.log('User has credits')
    }

    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }

    const answer = await response.json();
    setGeneratedBios(answer.choices[0].text);

    const success = await decrementUserCredits(user.id);
    // console.log('Credits decremented:', success); // Debugging log
    if (!success) {
      alert('Failed to update credits. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to generate bio. Please try again.');
  } finally {
    setLoading(false);
  }
}

const getUserCredits = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('api_credits')
      .eq('auth_id', userId)
      .single();
  
    if (error || !data) {
      console.error('Error fetching user credits:', error);
      return 0; // Return 0 if there's an error or no data
    }
  
    return data.api_credits;
  };

  

const checkUserCredits = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('api_credits')
      .eq('auth_id', userId)
      .single();
  
    if (error || !data) {
      console.error('Error fetching user credits:', error);
      return false;  // Assuming error or no data means no credits
    }
  
    return data.api_credits > 0;
  };
  
  const decrementUserCredits = async (userId) => {
    // First, retrieve the current credit count
    let { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('api_credits')
      .eq('auth_id', userId)
      .single();
  
    if (fetchError) {
      console.error('Error fetching user credits:', fetchError);
      return false;
    }
  
    // Check if the user has enough credits
    if (userData.api_credits <= 0) {
      console.error('User does not have enough credits');
      return false;
    }
  
    // Decrement the credits
    const { error: updateError } = await supabase
      .from('users')
      .update({ api_credits: userData.api_credits - 1 })
      .eq('auth_id', userId);
  
    if (updateError) {
      console.error('Error updating credits:', updateError);
      return false;
    }
  
    return true;
  };
  const sanitizedContent = DOMPurify.sanitize(generatedBios);

// {app && console.log(app)}

  return (
    <>
    {user?.id ? (
    <div className='dashboard-container'>
    <Breadcrumbs appName={appName} slugId={slug} />
      {/* <Link href='/appdash' className='appdash-back-btn'><BsArrowLeft /> Back to AppDashboard</Link> */}
      <button onClick={toggleSide} type='button' className='appdash-side-btn' >Toggle Apps</button>
      <div className={editingApp ? 'toggle-side-container' : 'toggle-side-ns'}>
        <button onClick={closeSide} className='side-close'><IoMdClose /></button>
        <div className='toggle-side-grid'>
          <div className='side-grid-item'><img src='' className='side-img'></img></div>
        </div>
      </div>
      {/* {app && <Link href={app.domain} rel='noreferrer' target='_blank' className='appdash-external-btn'><BiLinkExternal /></Link>} */}
      <div className='anti-flexer dash-flexer'>
      {/* {app && <img src={appLogo} className='aprotonppdash-grid-img dashboard-grid-img' alt={`${app.name} logo`} />} */}
      {app && <h2 className='dashboard-header appdash-header'>{app.name}</h2>}
      {/* {app && <Link href={domain} rel='noreferrer' target="_blank" className='link header-link'><h6 className='appdash-header-domain'>{app.domain}</h6></Link>} */}

      </div>

      <div className='appdash-health-tabs'>
            {integratedApps && integratedApps.map((app, index) => (
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
        {appIntegrate && (
      <div className='app-integrate-container'>
                <button onClick={toggleAppIntegrate} className='side-close'><IoMdClose /></button>

        <h3 className='app-integrate-header'>Integrate Your App</h3>
        <form className='app-integrate-form' ref={formRef} onSubmit={handleSubmit}>
          {/* <div className='login-email-div'>
            <select className='integrate-select' value={selectedValue} onChange={handleUpdate}>
              <option value="">Select A Page</option>
              {appOptions.map((page, index) => (
                <option key={index} value={page.name} className='integrate-option'><img src={page.imgSrc}></img>{page.name}</option>
              ))}
            </select>
          </div>        */}
          <IntegrateDropdown options={appOptions} onOptionSelected={handleAppSelection} />
          <div className='login-email-div'>
            <input type="text" name="url" placeholder="URL" className='login-input' />
          </div>
          <button type="submit" className='btn btn-tertiary integrate-btn'>Integrate App</button>
        </form>
      </div>
    )}
      </div>

      {/* <AppDashAnalytics /> */}
 
        {siteUrls ? (
               <div className='dashboard-grid seo-dash-grid'>
                <Link  className='seo-dash-item' href={`/dashboard/seo/${slug}`}>

               <div className='seo-dash-item'>
               <h2>SEO</h2>
               {app?.technical_analysis ? (<GaugeChartComponent id="gauge-chart3" percent={((app.technical_analysis['Truthy Values Count'])/16)*100} width="300px" className='seo-dash-chart'/>):(<GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>)}

               {/* {app?.seo_score ? (<GaugeChartComponent id="gauge-chart3" percent={app.technical_analysis['Truthy Values Count']} width="300px" className='seo-dash-chart'/>):(<GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>)} */}
               </div>
               </Link>
            </div>
   
        ):(
          <div className='dashboard-grid seo-dash-grid'>
          <div className='seo-dash-item'>
          <h2>SEO</h2>
          <GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>
          </div>
              <div className='analytics-integrate-fixed'>
            <div className='anti-flexer'>
          <h2 className='seo-integrate-header'>SEO has not been configured for your site, get started with a test.</h2>
          {app ? <Link href={`/dashboard/seo/${app.id}`}><button type='button' className='integrate-btn btn btn-primary'>Test SEO</button></Link>:(<button type='button' className='integrate-btn btn btn-primary'>Test SEO</button>)}
          </div>
          </div>
          {/* <Link href={`/dashboard/technical/${app.id}`}> */}
          <div className='dashboard-grid-item'>
              <h2 className='dashboard-grid-header'>Technical SEO</h2>
              <GaugeChartComponent id="gauge-chart1" percent={score} width="250px" />
          </div>
          {/* </Link> */}
          
        {/* <Link href={`/dashboard/onpage/${app.id}`}> */}
          <div className='dashboard-grid-item'>
          <h2 className='dashboard-grid-header'>On-Page SEO</h2>
          <GaugeChartComponent id="gauge-chart2" percent={score2} width="250px"/>
          </div>
          {/* </Link>
            
          <Link href={`/dashboard/offpage/${app.id}`}> */}
          <div className='dashboard-grid-item'>
          <h2 className='dashboard-grid-header'>Off-Page SEO</h2>
          <GaugeChartComponent id="gauge-chart3" percent={score3} width="250px"/>
          </div>
          {/* </Link> */}
          </div>
          
        )}

      <div className='generate-banner'>
          <h2>Generate Article - Powered by AI</h2>
          <button onClick={handleVisibility} className='btn btn-primary generate-btn'>Get Started &rarr;</button>
          {/* {user.isPaid ? :<Link href='/pricing'><button className='btn btn-primary generate-btn'></button></Link>} */}
        </div>
       {/* <AddBlogOfficial /> */}

       <div className="gpt-container">
                  <h1 className="gpt-header">Generate your SEO-Optimized Article</h1>
        {/* <p className="gpt-subheader">{globalArticleCount.toLocaleString()} articles generated so far.</p> */}
        {/* <p className="gpt-subheader">You have <span className='primary'>{userCredits}</span> credits available.</p> */}
        {/* <Link href='/pricing'><button className='btn btn-tertiary gpt-button'>Get More Credits</button></Link> */}
        <button className="btn btn-primary btn-margin" onClick={handleFetchCredits}>Check Credits</button>
            {userCredits && <p>You have {userCredits} credits</p>}
        <div className="gpt-form">
    
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="gpt-textarea"
            placeholder={
              "What would you like the article to be about?"
            }
          />

          <input type='number'
                onChange={handleValueChange}
                placeholder="Article Word Count ** 100 Word MAX" 
                  className="gpt-wordcount"

                  />

          {!loading && (
            <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate your article &rarr;</button>
          )}
          {loading && (
            <button className="btn btn-primary" disabled><Loading /></button>
          )}
        </div>

      
        <hr className="" />
        <h2 className='gpt-header'>Generated Article:</h2>
        {sanitizedContent && <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>}
        </div>
      {user && user.email == 'brandonluff10@gmail.com' && <DashContent />}

  </div>
    ):(
      <div className='no-user-container'>
      <div className='anti-flexer'>
      <h3 className='no-user-header'>Project Dashboard</h3>
      <Link href='/login'><button type='button' className='login-btn btn btn-primary'>Login</button></Link>
      </div>
      </div>
    )}
    </>

  )
}

export default Dashboard









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