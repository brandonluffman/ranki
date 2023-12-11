import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import GaugeChartComponent from './GaugeChartComponent';
import ControlBoard from './ControlBoard';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { BsArrowLeft } from 'react-icons/bs';
import Breadcrumbs from './Breadcrumbs';

const TechnicalDashboard = ({ slug, domain }) => {
    const [app, setApp] = useState(null);
    const router = useRouter();
    const score = 0;

    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchApp = async () => {
            setIsLoading(true);
            if (app && localStorage.getItem(`analysisResult_${app.id}`)) {
              setAnalysisResult(JSON.parse(localStorage.getItem(`analysisResult_${app.id}`)));

            } else {
                try {
                    const { data, error } = await supabase
                        .from('apps')
                        .select('*')
                        .eq('id', slug)
                        .single();
        
                    if (error) throw error;
                    setApp(data);
                    if (data && data.technical_analysis) {
                        setAnalysisResult(data.technical_analysis);
                    }
                } catch (error) {
                    console.error('Error fetching app:', error);
                } finally {
                    setIsLoading(false);
                }
              }
        };
    
        if (slug) {
            fetchApp();
        }
    }, [slug]);
    

    const saveAnalysisToDB = async (result) => {
        if (!app || !app.id) return;
      
        try {
          const { error } = await supabase
            .from('apps') // Assuming 'apps' is the table name
            .update({
              // Add or update a column, e.g., 'seo_analysis', with the result
              technical_analysis: result, 
              technical_last_tested: new Date().toISOString() // Update last tested date
            })
            .match({ id: slug }); // Match the app by its ID
      
          if (error) throw error;
        } catch (error) {
          console.error('Error saving analysis result to DB:', error);
        }
      };
      

      const fetchData = async () => {
        if (!app || !domain) return 'Not Happenin';
        // console.log(app.domain)
        // const domain = app.domain; // Example domain
        console.log(domain)
        // const apiUrl = `http://127.0.0.1:8000/technicalseo?url=${domain}`;
        const apiUrl = `https://rankiai-fe08b8a427f4.herokuapp.com/technicalseo?url=${domain}`;


        // if (cachedResult) {
        //   setAnalysisResult(JSON.parse(cachedResult));
        // } else {
          setIsLoading(true);
          try {
            const response = await axios.get(apiUrl);
            setAnalysisResult(response.data);
            localStorage.setItem(`analysisResult_${app.id}`, JSON.stringify(response.data)); // Save to local storage
            saveAnalysisToDB(response.data); // Save to database
          } catch (error) {
            console.error('Error fetching data:', error);
            setAnalysisResult(null);
          } finally {
            setIsLoading(false);
          }
        
      };

      // {app && console.log(app.technical_last_tested)}

      const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className='technical-dashboard-container'>
        <div>
            {/* <h1 className='tech-dash-header'>Technical SEO</h1> */}
            <GaugeChartComponent id="gauge-chart1" percent={score} width="300px" />
            <button type='button' className='btn btn-primary tech-dash-btn' onClick={fetchData}>Test Now</button>
            {app && <p className='tech-dash-last-p'><b>Last Tested:</b> {formatDate(app.technical_last_tested)}</p>}
            {app && <ControlBoard analysisResult={analysisResult} />}
            <div>
                {isLoading ? <p>Loading...</p> : null}
            </div>
        </div>
    </div>
    )
}

export default TechnicalDashboard;
