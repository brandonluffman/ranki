import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import Breadcrumbs from './Breadcrumbs';
import { useRouter, router } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { BsArrowRight, BsThreeDotsVertical } from 'react-icons/bs';
import CircularScoreGauge from './CircularScoreGauge';
import Loading from './Loading';

const DashContent = ({ slug, length }) => {
      const { user } = useContext(UserContext);
      const [isToggled, setIsToggled] = useState(false);
      const [blogs, setBlogs] = useState([]);
      const [aiSuggestions, setAiSuggestions] = useState([]);
      const [appName, setAppName] = useState(null)
      const [appDomain, setAppDomain] = useState(null);
      const [keywords, setKeywords] = useState([]);
      const [newKeyword, setNewKeyword] = useState(''); // State to store the new keyword
      const [visible, handleVisible] = useState(false);
      const [isLoading, setIsLoading] = useState(false);


      useEffect(() => {
        const appId = slug;

            const loadData = async () => {
                const fetchedBlogs = await fetchBlogs(slug);
                setBlogs(fetchedBlogs);
                fetchAppName(appId);

            };
    
            loadData();
        }, []);
        
      const fetchAppName = async (appSlug) => {
        // const cachedApp = localStorage.getItem(`appDetails_${appSlug}`);
        try {
            const { data, error } = await supabase
                .from('apps')
                .select('name, domain') // Corrected select statement
                .eq('id', appSlug)
                .single();
    
            if (error) throw error;
    
            if (data) {
                setAppName(data.name);
                setAppDomain(data.domain);   
                console.log(data.domain);
            } else {
                console.log('No data found for the given appSlug');
            }     
        } catch (error) {
            console.error('Error fetching app details:', error);
        }
    };
  
      const fetchBlogs = async (slug, limit=3) => {
            // console.log('Initiatyed Blog Fetch, Here is the provided slug: ', slug)
          const { data, error } = await supabase
              .from('blogs')
              .select('*')
              .eq('app_id', slug)
              .limit(limit);

      
          if (error) {
            //   console.error('Error fetching blogs:', error);
              return [];
          }
      
          return data;
      };

        const formatDate = (isoString) => {
            const date = new Date(isoString);
            return date.toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        };

        const createSlug = (text) => {
            return text
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-zA-Z0-9-]/g, '');
        };

        const truncateText = (text, maxLength) => {
            if (text.length <= maxLength) return text;
            return text.substr(0, maxLength) + '...';
        };
    
          
        return (
            <div className='blog-dashcontent-container'>
              <div className='dashboard-content-container'>
                <h1 className='blog-dashcontent-header'>Blogs</h1>
        
                {blogs && blogs.length > 0 ? (
                  <div className='dash-content-grid-small'>
                    {blogs.slice(0,3).map(blog => (
                      <div key={blog.id} className='dash-content-grid-item searchresult'>
                        <div className='flexer search-result-flexer'>
                          <img src='/ranki-logo.png' className='serp-favicon'></img>
                          <div className='antiflexer'>
                            {appName && <h6 className='serp-name'>{appName}</h6>}
                            {appDomain && blog.title && (
                              <a className='dash-content-link' rel='noreferrer' target="_blank" href={`${appDomain}/blog/${createSlug(blog.title)}`}>
                                {truncateText(`${appDomain}/blog/${createSlug(blog.title)}`, 35)}
                              </a>
                            )}
                          </div>
                        </div>
                        {blog.title && <h2 className='content-item-header'>{blog.title}</h2>}
                        <p className='serp-description'><span className='serp-date'>{formatDate(blog.created_at)} -</span> {blog.meta_description}</p>
                        {blog.is_published == true ? <h6 className='is-draft draft-published'>Published</h6> : <h6 className='is-draft'>Draft</h6>}
                        <div style={{ width: 50, height: 50 }} className='blog-dash-score'>
                          <CircularScoreGauge score={75} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='no-blogs'>
                    <p>No blogs found, start growing your sites Google Rankings now by creating content <Link href={`/generate/${slug}`} className='link' passHref>here</Link></p>
                  </div>
                )}
        
                <Link href={`/generate/${slug}`} passHref><button className='add-content-container'><IoMdAdd /></button></Link>
              </div>
            </div>
          );
}

export default DashContent






            {/* <div className='dashboard-content-suggestions'>
            <h2 className='blog-dashcontent-header'><span className='ai-gradient'>AI</span> Suggestions</h2>
                {aiSuggestions.length > 0 ? (
                    <div className='dash-content-grid-small'>
                        {aiSuggestions.map(idea => (
                            <div key={idea.id} className='dash-content-grid-item searchresult grid-item-suggestion'>
                                    <div className='flexer search-result-flexer'>
                                        <img src='/ranki-logo.png' className='serp-favicon'></img>
                                        <div className='antiflexer'>
                                            {appName && <h6 className='serp-name'>{appName}</h6>}
                                            {appDomain && idea.title && <a className='dash-content-link' rel='noreferrer' target="_blank" >{truncateText(`${appDomain}/blog/${createSlug(idea.title)}`, 35)}</a>}
                                        </div>
                                        </div>
                                <h2 className='content-item-header'>{idea.title}</h2>
                                <p>{idea.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='no-suggestions'><p>No AI suggestions found.</p></div>
                )}


          </div>
          <div className='keywords-dashcontent-container'>
          <h2 className='blog-dashcontent-header'>Ranking Keywords</h2>

                <table className='keyword-dash-table'>
                    <thead className='keywords-thead'>
                        <tr className='keywords-header-row'>
                            <th>Keyword</th>
                            <th>Monthly Search Volume</th>
                            <th>Competition</th>
                            <th>Ranking Position</th>
                        </tr>
                    </thead>
                    <tbody>
                            {keywords.filter(keyword => keyword).slice(0, length || keywords.length).map((keyword, index) => (
                                <tr className='keywords-menu' key={index}>
                                    <td className='keywords-li'>{keyword}</td>
                                    <td>10K-100K</td>
                                    <td>High</td>
                                    <td>7</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                </div> */}

{/*
                const fetchBlogIdeas = async (appId) => {
                    let { data: blogIdeas, error } = await supabase
                        .from('blog_ideas')
                        .select('*')
                        .eq('app_id', appId)
                        .limit(3);
                
                    if (error) {
                        console.log('Error fetching blog ideas:', error);
                        return [];
                    }
                
                    return blogIdeas;
                };



        
                const handleKeywordChange = (e) => {
                    setNewKeyword(e.target.value);
                };
            
                const handleAddKeyword = async (e) => {
                    e.preventDefault();
                    if (!newKeyword) return;
                
                    setIsLoading(true);
                
                    try {
                        // Assuming 'currentAppId' is the ID of the app you want to update
                        const { data: appData, error: fetchError } = await supabase
                            .from('apps')
                            .select('targeted_keywords')
                            .eq('id', slug) // Use the specific app ID here
                            .single();
                
                        if (fetchError) throw fetchError;
                
                        // Check if targeted_keywords is an array, if not, treat it as an empty array
                        let keywordsArray = appData.targeted_keywords ? appData.targeted_keywords : [];
                        if (typeof keywordsArray === 'string') {
                            keywordsArray = JSON.parse(keywordsArray); // Parse stringified JSON if necessary
                        }
                        const updatedKeywords = Array.from(new Set([...keywordsArray, newKeyword]));
                
                        const { error: updateError } = await supabase
                            .from('apps')
                            .update({ targeted_keywords: updatedKeywords })
                            .eq('id', slug);
                
                        if (updateError) throw updateError;
                
                        // Update local state
                        setKeywords(updatedKeywords);
                    } catch (error) {
                        console.error("Error updating keywords:", error);
                    } finally {
                        setIsLoading(false);
                        setNewKeyword(''); // Reset input field
                    }
                };
                
                
                
            
                const toggleKeywordAdd = () => {
                    handleVisible(!visible)
                }
            
                const handleDeleteKeyword = async (keywordToDelete, appId) => {
                    setIsLoading(true);
                
                    try {
                        // Fetch the current targeted_keywords for the specific app
                        const { data: appData, error: fetchError } = await supabase
                            .from('apps')
                            .select('targeted_keywords')
                            .eq('id', appId)
                            .single();
                
                        if (fetchError) throw fetchError;
                
                        // Filter out the keyword to delete
                        const updatedKeywords = appData.targeted_keywords.filter(keyword => keyword !== keywordToDelete);
                
                        // Update the database
                        const { error: updateError } = await supabase
                            .from('apps')
                            .update({ targeted_keywords: updatedKeywords })
                            .eq('id', appId);
                
                        if (updateError) throw updateError;
                
                        // Update local state
                        setKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToDelete));
                    } catch (error) {
                        console.error("Error deleting keyword:", error);
                    } finally {
                        setIsLoading(false);
                    }
                };
        
                const fetchUserKeywords = async () => {
                    if (!user) {
                        console.error("User not authenticated");
                        router.push('/login');
                        return;
                    }
            
                    setIsLoading(true); // set loading to true when the fetch starts
                    try {
                        const { data: appsData, error } = await supabase
                            .from('apps')
                            .select('targeted_keywords')
                            .eq('id', slug);
            
                        if (error) {
                            throw error;
                        }
            
                        setKeywords(appsData.map(app => app.targeted_keywords).flat());
                    } catch (error) {
                        console.error("Error fetching apps:", error);
                        // you might want to show some error message to the user here
                    } finally {
                        setIsLoading(false); // set loading to false once the fetch is complete
                    }
                };



            */}