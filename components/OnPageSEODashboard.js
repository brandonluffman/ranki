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
    const [domainId, setDomainId] = useState(null);
    const [lastTested, setLastTested] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    const handleChange = (event) => {
        const selectedURL = event.target.value;
        setSelectedPageURL(selectedURL);
        setSelectedPageDomain(new URL(selectedURL).hostname);
        setAnalysisResult(null); // Clear the current result
        setErrorMessage(null);
    };



    useEffect(() => {
        const loadAnalysisResult = async () => {
            if (selectedPageURL) {
                console.log(selectedPageURL)
                // Attempt to fetch from local storage first
                const savedAnalysisResult = localStorage.getItem(`analysisResult_${selectedPageURL}`);
                if (savedAnalysisResult) {
                    console.log('Found Analysis Result for:', selectedPageURL);
                    setAnalysisResult(JSON.parse(savedAnalysisResult));
                } else {
                    // If not in local storage, fetch from the database
                    console.log('Fetching new analysis result for:', selectedPageURL);
                    try {
                        const { data, error } = await supabase
                            .from('site_urls')
                            .select('test_results')
                            .eq('domain', selectedPageURL)
                            .single();
        
                        if (error) throw error;
        
                        if (data?.test_results) {
                            console.log('Fetched data in the UseEffect :', data.test_results);
                            setAnalysisResult(data.test_results);
                        }
                    } catch (error) {
                        console.error('Error fetching test results:', error);
                    }
                }
            } else {
                console.log('No Selected Page URL');
            }
        };

        loadAnalysisResult();

        fetchLastTested();

    }, [selectedPageURL]);





    useEffect(() => {
    
        // Retrieve page options from local storage
        const savedPageOptions = localStorage.getItem(`pageOptions_${domain}`);
        if (savedPageOptions) {
            console.log('Found Page Options');
            setPageOptions(JSON.parse(savedPageOptions));
        } else {
            // Check if domains are already associated with the app_id
            const checkDomains = async () => {
                try {
                    const { data, error } = await supabase
                        .from('site_urls')
                        .select('domain')
                        .eq('app_id', slug);
    
                    if (error) throw error;
    
                    if (data && data.length) {
                        console.log(`Domains already associated with app_id: ${slug}`);
                        // Optionally, you can set the pageOptions here if needed
                        setPageOptions(data.map(item => item.domain));
                    } else {
                        console.log('Fetching Page Options');
                        fetchPages();
                    }
                } catch (error) {
                    console.error('Error checking associated domains:', error);
                }
            };
    
            checkDomains();
        }

        if (selectedPageURL) {
            fetchLastTested(selectedPageURL);
        }
    }, [domain, selectedPageURL, slug]);










    const fetchPages = async () => {
        // const apiUrl = `http://127.0.0.1:8000/get-unique-pages/?domain=${domain}`;
        const apiUrl = `https://rankiai-fe08b8a427f4.herokuapp.com/get-unique-pages/?domain=${domain}`;

        
        console.log('Fetching pages from:', apiUrl);
        setIsLoading(true);
    
        try {
            const response = await axios.get(apiUrl);
            if (response.data && response.data.length) {
                setPageOptions(response.data);
    
                for (const url of response.data) {
                    try {
                        const { data, error } = await supabase
                            .from('site_urls')
                            .select('*')
                            .eq('domain', url)
                            .maybeSingle(); 
                
                        if (error) throw error;
                
                        if (!data) {
                            const slugInt = parseInt(slug, 10);

                            const insertResponse = await supabase
                                .from('site_urls')
                                .insert([{ domain: url, app_id: slugInt}]);
                
                            if (insertResponse.error) {
                                throw insertResponse.error;
                            }
                        } else {
                            console.log(`URL already exists in the database: ${url}`);
                        }
                    } catch (error) {
                        if (error.code === "23505") {
                            console.warn(`Duplicate entry for URL: ${url}. Skipping.`);
                        } else {
                            console.error(`Error checking/inserting URL: ${url}`, error);
                        }
                    }
                }
            } else {
                alert('No webpages found under your domain. Ensure there is an XML Sitemap.');
            }
        } catch (error) {
            console.error('Error fetching pages:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const saveAnalysisToDB = async (result) => {
        if (!selectedPageURL) {
            console.error('Selected page URL is not set. Cannot save analysis results.');
            return;
        }
        try {
            const { error } = await supabase
                .from('site_urls')
                .update({
                    test_results: result, // Column to update with the analysis result
                    last_tested: new Date().toISOString() // Optionally update the last tested date
                })
                .eq('domain', selectedPageURL); // Match the row by the domain
    
            if (error) throw error;
            console.log('Saved analysis to DB for domain:', selectedPageURL);

            fetchLastTested(selectedPageURL);
s
        } catch (error) {
            console.error('Error saving analysis result to DB:', error);
        }
    };
    
    
    

    const fetchLastTested = async () => {
        if (selectedPageURL) {
            try {
                const { data, error } = await supabase
                    .from('site_urls')
                    .select('last_tested')
                    .eq('domain', selectedPageURL)
                    .single();
    
                if (error) throw error;
    
                if (data && data.last_tested) {
                    console.log('Fetched data:', data); // This will correctly show the fetched data
                    setLastTested(data.last_tested); // Updates the state
                }
                console.log('Havent tested yet')
            } catch (error) {
                console.error('Error fetching last tested date:', error);
            }
        }
    };

    
    const triggerAnalysis = async () => {
        if (!selectedPageURL) return;
    
        setIsLoading(true);
        setErrorMessage(null); // Reset the error message at the start
    
        try {
            // Check if the webpage provides a 200 status code
            const statusCheckResponse = await axios.get(selectedPageURL);
            if (statusCheckResponse.status !== 200) {
                setErrorMessage('Webpage does not provide a 200 status code');
                return; // Exit the function if status is not 200
            }
    
            // Proceed with the analysis if status is 200
            const response = await axios.get(`https://rankiai-fe08b8a427f4.herokuapp.com/onpageseo`, {
                params: { url: selectedPageURL }
            });
    
            localStorage.setItem(`analysisResult_${selectedPageURL}`, JSON.stringify(response.data));
            setAnalysisResult(response.data);
            
            saveAnalysisToDB(response.data); // Save to database
    
            // Fetch the last tested date after saving
            fetchLastTested(selectedPageURL);
           
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error occurred while fetching data, please make sure the page you have selected is active.');
        } finally {
            setIsLoading(false);
        }
    };
    

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
            
               <>
                    {/* <Link href={`/dashboard/${app.id}`} className='sub-dash-back'>Back to the {app.name} Dashboard</Link> */}
                    {/* <h3>On-Page SEO</h3> */}
                    <GaugeChartComponent id="gauge-chart1" percent={0} width="300px" className='gauge-component' />
                    <h6 className='selected-page-header'> Page: {selectedPageURL}</h6>

                    {lastTested && <p className='tech-dash-last-p'><b>Last Tested:</b> {formatDate(lastTested)}</p>}
                  
                    {pageOptions.length > 0 ? (<select value={selectedPageURL} onChange={handleChange} className='dashboard-web-select'>
                        <option value="">Select A Page</option>
                        {pageOptions.map((page, index) => (
                            <option key={index} value={page}>{new URL(page).pathname}</option>
                        ))}
                    </select>


                    ) : (
                        <button type='button' className='btn btn-primary' onClick={fetchPages}>Find Site Pages</button>
                    )}
                    <div className='seo-dash-test-btn-container'>
                                        {pageOptions.length > 0 ? (<button type='button' className='btn btn-primary tech-dash-btn' onClick={triggerAnalysis}>Test Now</button>):(<div>No Page Found</div>)}
                                        </div>
                                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                    {analysisResult && !errorMessage && <OnPageControlBoard analysisResult={analysisResult} />}
                </>
            {/* {app ? (
             
            ):(<div>Not Found</div>)} */}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default OnPageSEODashboard;
