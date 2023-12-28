import React, { useState, useEffect, useContext } from 'react';
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
import { UserContext } from '../context/UserContext';
import { BsArrowLeft } from 'react-icons/bs';

const SEODashboard = () => {
    const [app, setApp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDashboard, setSelectedDashboard] = useState('Technical');
    const { user, login, logout } = useContext(UserContext);

    const router = useRouter();
    const { slug } = router.query;
    const domain = app ? app.domain: null;

    useEffect(() => {
        if (!user) {
            console.error("User not authenticated");
            setIsLoading(false);
            return;
          }
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
        <div className='seo-dashboard-container'>
            {app ? (
                user && user.id === app.user_id ? (
                    <>
                    <Breadcrumbs />

            <Link href={`/dashboard/${app.id}`} className='sub-dash-back'><BsArrowLeft className='arrow' /></Link>
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
            {selectedDashboard === 'Technical' && <TechnicalDashboard slug={slug} domain={domain} />}
            {selectedDashboard === 'OnPage' && <OnPageDashboard slug={slug} domain={domain} />}
            {selectedDashboard === 'OffPage' && <OffPageDashboard slug={slug} />}
        </>
                ) : (
                    <div className='no-user-container'>You don&apos;t have access to this App.</div>
                )
            ) : (
                <div className='no-user-container'>
                    <div className='anti-flexer'>
                    <h6>No User Found or the app you are trying to access does not exist.</h6>
                
                {/* <Link href='/login'><button className='no-user-btn btn btn-primary'>Login</button></Link> */}
                </div></div>
            )}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default SEODashboard;
