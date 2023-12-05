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



const Dashboard = ({slugId}) => {
    const router = useRouter();
    const { slug } = router.query;
    const [app, setApp] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [integratedApps, setIntegratedApps] = useState([
      // Initialize with any existing apps
      // { url: '...', imgSrc: '...' },
    ]);
    const [appName, setAppName] = useState('');

    const [seo, setSEO] = useState(null);
    const [score, setScore] = useState(null); // Example score
    const [score2, setScore2] = useState(null); // Example score
    const [score3, setScore3] = useState(null); // Example score
    const [editingApp, setEditingApp] = useState(true);
    const [appIntegrate, setAppIntegrate] = useState(false);
    const { user, login, logout } = useContext(UserContext);
    const formRef = useRef(null);
    const appOptions = [
      {
        name: "Vercel",
        imgSrc: "/vercel.png" // Replace with the actual path to your image
      },
      {
        name: "Proton",
        imgSrc: "/proton.png" // Replace with the actual path to your image
      },
      {
        name: "Google",
        imgSrc: "/google.png" // Replace with the actual path to your image
      },
      {
        name: "Namecheap",
        imgSrc: "/namecheap.png" // Replace with the actual path to your image
      },
      {
        name: "Supabase",
        imgSrc: "/supabase.png" // Replace with the actual path to your image
      },
      {
        name: "Stripe",
        imgSrc: "/stripe.png" // Replace with the actual path to your image
      },
      {
        name: "Github",
        imgSrc: "/github.png" // Replace with the actual path to your image
      },
      {
        name: "Google Analytics",
        imgSrc: "/google-analytics.png" // Replace with the actual path to your image
      },
      {
        name: "Heroku",
        imgSrc: "/heroku.png" // Replace with the actual path to your image
      },
    ];


     const domain = app ? 'https://' + app.domain: null;

    const toggleSide = () => {
      setEditingApp(prevState => !prevState);
      console.log(editingApp)
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
 
    const handleSubmit = async (event) => {
      const actualSlug = slug ? slug : null;

      event.preventDefault();
      const appName = selectedValue; // The name of the selected app
      const appUrl = formRef.current.url.value; // The URL entered by the user
      
      // Find the selected app in appOptions to get its imgSrc
      const selectedApp = appOptions.find(app => app.name === appName);
      const imgSrc = selectedApp ? selectedApp.imgSrc : '/path-to-default-image.png';
    
      // Construct the new app object
      const newApp = {
        name: appName,
        url: appUrl,
        imgSrc: imgSrc // Use the imgSrc from the selected app
      };
    
      // Add the new app to the integratedApps state
      setIntegratedApps(currentApps => [...currentApps, newApp]);
      
      // Update the apps table in Supabase
      const { data, error } = await supabase
        .from('apps')
        .update({ integrated_apps: [...integratedApps, newApp] }) // Assuming 'integrated_apps' is your new column
        .eq('id', actualSlug); // Use the appropriate identifier for the app
      
      localStorage.setItem('integratedApps', JSON.stringify([...integratedApps, newApp]));

      if (error) {
        console.error('Error updating app:', error);
      }
    };
    
    
    const handleUpdate = (event) => {
      setSelectedValue(event.target.value);
    }; 

    useEffect(() => {
      const actualSlug = slug ? slug : null;
      const savedApps = localStorage.getItem('integratedApps');
      if (savedApps) {
          setIntegratedApps(JSON.parse(savedApps));
      }
      if (actualSlug) {
          supabase
              .from('apps') // Replace 'apps' with your table name
              .select('*') // Select the columns you need
              .eq('id', actualSlug) // Replace 'slug' with the column you are matching against
              .single() // Assuming each slug uniquely identifies an app
              .then(({ data, error }) => {
                  if (error) {
                      console.error('Error fetching app:', error);
                  } else {
                      setApp(data);
                  }
              });
      }
      const fetchAppName = async () => {
        const actualSlug = slug ? slug : null;

        try {
            let { data, error, status } = await supabase
                .from('apps') // Replace with your table name
                .select('name') // Replace 'name' with the field that contains the app name
                .eq('id', actualSlug) // Replace 'id' with the field that contains the slug or ID
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setAppName(data.name); // Replace 'name' with the key that contains the app name
            }
        } catch (error) {
            console.error('Error fetching app name:', error);
        }
    };

    fetchAppName();
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
        // Optionally revert the state change or notify the user
    }
};


  return (
    <>
    {user ? (
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
      {app && <Link href={app.domain} rel='noreferrer' target='_blank' className='appdash-external-btn'><BiLinkExternal /></Link>}
      <div className='anti-flexer dash-flexer'>
      {/* {app && <img src={appLogo} className='aprotonppdash-grid-img dashboard-grid-img' alt={`${app.name} logo`} />} */}
      {app && <h2 className='dashboard-header appdash-header'>{app.name}</h2>}
      {app && <Link href={domain} rel='noreferrer' target="_blank" className='link header-link'><h6 className='appdash-header-domain'>{app.domain}</h6></Link>}

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
      <div className='app-integrate-container appdash-add-show'>
                <button onClick={toggleAppIntegrate} className='side-close'><IoMdClose /></button>

        <h3 className='app-integrate-header'>Integrate Your App</h3>
        <form className='app-integrate-form' ref={formRef} onSubmit={handleSubmit}>
          <div className='login-email-div'>
            <select className='integrate-select' value={selectedValue} onChange={handleUpdate}>
              <option value="">Select A Page</option>
              {appOptions.map((page, index) => (
                <option key={index} value={page.name}><img src={page.imgSrc}></img>{page.name}</option>
              ))}
            </select>
          </div>       
          <div className='login-email-div'>
            <input type="text" name="url" placeholder="URL" className='login-input' />
          </div>
          <button type="submit" className='btn btn-tertiary'>Integrate App</button>
        </form>
      </div>
    )}
      </div>

      <AppDashAnalytics />
 
        {seo ? (
               <div className='dashboard-grid seo-dash-grid'>
               <div className='seo-dash-item'>
               <h2>SEO</h2>
               <GaugeChartComponent id="gauge-chart3" percent={score3} width="300px" className='seo-dash-chart'/>
               </div>
        <Link href={`/dashboard/technical/${app.id}`}>
        <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>Technical SEO</h2>
            <GaugeChartComponent id="gauge-chart1" percent={score} width="250px" />
        </div>
        </Link>
   
            <Link href={`/dashboard/onpage/${app.id}`}>
            <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>On-Page SEO</h2>
            <GaugeChartComponent id="gauge-chart2" percent={score2} width="250px"/>
            </div>
            </Link>
     
              <Link href={`/dashboard/offpage/${app.id}`}>
            <div className='dashboard-grid-item'>
            <h2 className='dashboard-grid-header'>Off-Page SEO</h2>
            <GaugeChartComponent id="gauge-chart3" percent={score3} width="250px"/>
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
          <h2 className='seo-integrate-header'>SEO has not been configured for your site, get started by testing your site.</h2>
          <button type='button' className='integrate-btn btn btn-primary'>Test SEO</button>
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
      
    
     {/* <DashContent /> */}
     {/* <GMBDash /> */}
  </div>
    ):(
      <div className='no-user-container'>
      <div className='anti-flexer'>
      <h3>No User Found, Log in to view dashboard</h3>
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