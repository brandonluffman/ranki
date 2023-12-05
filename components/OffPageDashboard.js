import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Link from 'next/link';
import ControlBoard from './ControlBoard';
import GaugeChartComponent from './GaugeChartComponent';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient'; // Import your initialized Supabase client
import OffPageControlBoard from './OffPageControlBoard';
import DashContent from './DashContent';
import GMBDash from './GMBDash';

const OffPageDashboard = ({idslug}) => {
    const [app, setApp] = useState(null);
    const router = useRouter();
    const { slug } = router.query;
    useEffect(() => {
      const actualSlug = slug ? slug : null;
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
  }, [slug]);
      const score = 60;

  return (
      <div className='technical-dashboard-container'>
      {app && <Link href={`/dashboard/${app.id}`} className='sub-dash-back'>Back to the {app.name} Dashboard</Link>}
        
      {app && (
          <div>
          {/* <img className='tech-dash-img' src={appLogo}></img> */}
      <h3>Off-Page SEO | {app.name}</h3>
      <GaugeChartComponent id="gauge-chart1" percent={score} width="300px" />

      </div>
      )}
      <OffPageControlBoard />
      {/* <DashContent /> */}
        {/* <GMBDash /> */}
        {/* <ControlBoard /> */}
         {/*  <div className='on-page-grid'>
            <div className='onpage-keywords-container'>

            </div>
          </div> */}

  </div>
  )
}

export default OffPageDashboard