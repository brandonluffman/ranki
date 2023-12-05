import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import OnPageControlBoard from './OnPageControlBoard';
import GaugeChartComponent from './GaugeChartComponent';

const OnPageSEODashboard = () => {
    const [app, setApp] = useState(null);
    const [selectedPageURL, setSelectedPageURL] = useState('');
    const [selectedPageDomain, setSelectedPageDomain] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageOptions, setPageOptions] = useState([]);
    const router = useRouter();
    const { slug } = router.query;

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
                    fetchPages(data.domain);
                } catch (error) {
                    console.error('Error fetching app:', error);
                }
            }
        };
        fetchData();
    }, [slug]);

    const fetchPages = async (domain) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/get-unique-pages/?domain=${encodeURIComponent(domain)}`);
            setPageOptions(response.data);
        } catch (error) {
            console.error('Error fetching pages: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const selectedURL = event.target.value;
        setSelectedPageURL(selectedURL);
        setSelectedPageDomain(new URL(selectedURL).hostname);
    };

    const triggerAnalysis = async () => {
        if (!selectedPageURL) return;
    
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/onpageseo`, {
                params: { url: selectedPageURL }
            });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='technical-dashboard-container'>
            {app && (
                <>
                    <Link href={`/dashboard/${app.id}`} className='sub-dash-back'>Back to the {app.name} Dashboard</Link>
                    <h3>On-Page SEO | {app.name}</h3>
                    <h6> Page: {selectedPageURL}</h6>
                    <GaugeChartComponent id="gauge-chart1" percent={30} width="300px" />
                    <button type='button' className='btn btn-primary tech-dash-btn' onClick={triggerAnalysis}>Test Now</button>
                    <p className='tech-dash-last-p'><b>Last Tested:</b> Aug 4th, 2023</p>
                    <select value={selectedPageURL} onChange={handleChange} className='dashboard-web-select'>
                        <option value="">Select A Page</option>
                        {pageOptions.map((page, index) => (
                            <option key={index} value={page}>{new URL(page).pathname}</option>
                        ))}
                    </select>
                    {analysisResult && <OnPageControlBoard analysisResult={analysisResult} />}
                </>
            )}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default OnPageSEODashboard;
