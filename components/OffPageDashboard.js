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

const OffPageDashboard = ({ slug }) => {
    const [app, setApp] = useState(null);

      const score = 0;

  return (
      <div className='technical-dashboard-container'>        
      {app ? (
          <div>
            <GaugeChartComponent id="gauge-chart1" percent={score} width="300px" />
          </div>
      ):(
        <div>
            <GaugeChartComponent id="gauge-chart1" percent={score} width="300px" />
        </div>
      )}
      <OffPageControlBoard />
  </div>
  )
}

export default OffPageDashboard