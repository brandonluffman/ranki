import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import OnPageControlBoard from './OnPageControlBoard';
import GaugeChartComponent from './GaugeChartComponent';

const OnPageSEODashboard = ({ slug, domain }) => {
    const [app, setApp] = useState(null);
    const [selectedPageURL, setSelectedPageURL] = useState('');
    const [selectedPageDomain, setSelectedPageDomain] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pageOptions, setPageOptions] = useState([]);
    // const router = useRouter();
    // const { slug } = router.query;


    const fetchPages = async () => {
        const apiUrl = `http://127.0.0.1:8000/get-unique-pages/?domain=${domain}`
        console.log(apiUrl)
        setIsLoading(true);
        try {
            const response = await axios.get(apiUrl);
            setPageOptions(response.data);
            console.log(response.data)
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

    console.log(pageOptions.length)
    return (
        <div className='technical-dashboard-container'>
               <>
                    {/* <Link href={`/dashboard/${app.id}`} className='sub-dash-back'>Back to the {app.name} Dashboard</Link> */}
                    {/* <h3>On-Page SEO</h3> */}
                    <GaugeChartComponent id="gauge-chart1" percent={30} width="300px" />
                    <h6> Page: {selectedPageURL}</h6>

                    <button type='button' className='btn btn-primary tech-dash-btn' onClick={triggerAnalysis}>Test Now</button>
                    <p className='tech-dash-last-p'><b>Last Tested:</b> Aug 4th, 2023</p>
                  
                    {pageOptions.length > 0 ? (<select value={selectedPageURL} onChange={handleChange} className='dashboard-web-select'>
                        <option value="">Select A Page</option>
                        {pageOptions.map((page, index) => (
                            <option key={index} value={page}>{new URL(page).pathname}</option>
                        ))}
                    </select>
                    ) : (
                        <button type='button' onClick={fetchPages}>Find Site Pages</button>
                    )}
                    {analysisResult && <OnPageControlBoard analysisResult={analysisResult} />}
                </>
            {/* {app ? (
             
            ):(<div>Not Found</div>)} */}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default OnPageSEODashboard;
