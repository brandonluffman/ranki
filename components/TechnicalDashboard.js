import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import GaugeChartComponent from './GaugeChartComponent';
import ControlBoard from './ControlBoard';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { BsArrowLeft } from 'react-icons/bs';
import Breadcrumbs from './Breadcrumbs';

const TechnicalDashboard = ({ idslug }) => {
    const [app, setApp] = useState(null);
    const router = useRouter();
    const { slug } = router.query;
    const score = 100;

    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const actualSlug = slug || null;
        if (actualSlug) {
            supabase
                .from('apps')
                .select('*')
                .eq('id', actualSlug)
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching app:', error);
                    } else {
                        setApp(data);
                    }
                });
        }
    }, [slug]);

    const fetchData = async () => {
        if (app && app.domain) {
            const url = app.domain;
            setIsLoading(true);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/technicalseo/${encodeURIComponent(url)}`);
                setAnalysisResult(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setAnalysisResult(null);
            }
            setIsLoading(false);
        }
    };

    return (
        <div className='technical-dashboard-container'>
            {/* {app && <Link href={`/dashboard/${app.id}`} className='tech-dash-back'><BsArrowLeft className='tech-dash-arrow'/> Back to the {app.name} Dashboard</Link>} */}
            <Breadcrumbs />

            {app && (
                <div>
                    <h1 className='tech-dash-header'>Technical SEO for <b>{app.name}</b></h1>
                    <GaugeChartComponent id="gauge-chart1" percent={score} width="300px" />
                    <button type='button' className='btn btn-primary tech-dash-btn' onClick={fetchData}>Test Now</button>
                    <p className='tech-dash-last-p'><b>Last Tested:</b> Aug 4th, 2023</p>
                    {analysisResult && <ControlBoard analysisResult={analysisResult} />} {/* Corrected the prop name */}
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            analysisResult && (
                                <div>
                                    {/* Your results rendering */}
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TechnicalDashboard;
