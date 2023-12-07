import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import OnPageControlBoard from './OnPageControlBoard';
import GaugeChartComponent from './GaugeChartComponent';
import TechnicalDashboard from './TechnicalDashboard'
import OnPageDashboard from './OnPageSEODashboard'
import OffPageDashboard from './OffPageDashboard'
import Breadcrumbs from './Breadcrumbs';

const SEODashboard = () => {
    const [app, setApp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDashboard, setSelectedDashboard] = useState('Technical');

    const router = useRouter();
    const { slug } = router.query;
    const domain = app ? app.domain: null;

    useEffect(() => {
        const fetchData = async () => {
            if (slug) {
                try {
                    const { data, error } = await supabase
                        .from('apps')
                        .select('*')
                        .eq('id', slug)
                        .single();
                    
                    if (error) throw error;
                    setApp(data);
                    // fetchPages(data.domain);
                } catch (error) {
                    console.error('Error fetching app:', error);
                }
            }
        };
        fetchData();
    }, [slug]);

    const handleDashboardChange = (dashboardName) => {
        setSelectedDashboard(dashboardName);
    };


    return (
        <div className='technical-dashboard-container'>
            <Breadcrumbs />
        {app && (
            <>
                {/* <Link href={`/dashboard/${app.id}`} className='sub-dash-back'>Back to the {app.name} Dashboard</Link> */}
                <h3 className='seo-dash-header'>SEO Dashboard | <b>{app.name}</b></h3>
                {/* UI for selecting dashboards */}
                <div className='dashboard-selector'>
                <button 
                    className={`someBaseClass ${selectedDashboard === 'Technical' ? 'border-dash' : ''}`} 
                    onClick={() => handleDashboardChange('Technical')}>
                    Technical Dashboard
                </button>                    
                <button 
                 className={`someBaseClass ${selectedDashboard === 'OnPage' ? 'border-dash' : ''}`} 
                onClick={() => handleDashboardChange('OnPage')}>
                    On-Page Dashboard
                    </button>
                    <button 
                     className={`someBaseClass ${selectedDashboard === 'OffPage' ? 'border-dash' : ''}`} 
                    onClick={() => handleDashboardChange('OffPage')}>Off-Page Dashboard</button>
                </div>

                {/* Render the selected dashboard */}
                {selectedDashboard === 'Technical' && <TechnicalDashboard slug={slug} />}
                {selectedDashboard === 'OnPage' && <OnPageDashboard slug={slug} domain={domain} />}
                {selectedDashboard === 'OffPage' && <OffPageDashboard slug={slug} />}
            </>
        )}
        {isLoading && <p>Loading...</p>}
    </div>
    );
}

export default SEODashboard;
