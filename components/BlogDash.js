import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import Breadcrumbs from './Breadcrumbs';
import { useRouter, router } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { BsArrowLeft, BsGrid, BsGrid3X3GapFill, BsThreeDotsVertical } from 'react-icons/bs';
import AddBlog from './AddBlog';
import BlogEditForm from './BlogEditForm';
import AddBlogOfficial from './AddBlogOfficial';
import Generate from './Generate';

const BlogDash = () => {
    const { user } = useContext(UserContext);
    const [isToggled, setIsToggled] = useState(false);
    const [toggled, setToggled] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [app, setApp] = useState(null);
    const [editBlogId, setEditBlogId] = useState(null);
    const [isGrid, setIsGrid] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [appName, setAppName] = useState(null)
    const [appDomain, setAppDomain] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [newKeyword, setNewKeyword] = useState(''); // State to store the new keyword
    const [visible, handleVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [ideaTokens, setIdeaTokens] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage, setBlogsPerPage] = useState(10); // Adjust based on your preference
    const [totalBlogs, setTotalBlogs] = useState(0);


    const length = 10;
    // const [seoUrl, setSEOUrl] = useState('')
    const router = useRouter();
    const { slug } = router.query;






    const fetchIdeaTokens = async () => {
        if (user?.id) {
            console.log('Fetching Idea Tokens')
            const { data, error } = await supabase
                .from('users')
                .select('idea_generation_tokens')
                .eq('auth_id', user.id)
                .single(); 

            const tokens = data.idea_generation_tokens
            setIdeaTokens(tokens)                
            if (error) {
                console.log('Faled to fetch', error)
            }
        } else {
            console.log('No User Found')
        }
    };


    const toggleAddForm = () => {
        setIsToggled(prev => !prev);
    }


    const toggleEditForm = (blogId) => {
        setEditBlogId(blogId);
        setToggled(prev => !prev);
    }
    const fetchBlogs = async (slug) => {
        console.log('fetching')
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .limit(3)
            .eq('app_id', slug);      
        if (error) {
            console.log('Faled to fetch', error)
        }
    
        return data;
    };

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

    const fetchBlogIdeas = async (appId) => {
        let { data: blogIdeas, error } = await supabase
            .from('blog_ideas')
            .select('*')
            .eq('app_id', appId);
    
        if (error) {
            console.log('Error fetching blog ideas:', error);
            return [];
        }
    
        return blogIdeas;
    };


    const handleDeleteBlog = (postId) => {
        if (window.confirm("Are you sure you want to delete this blog? This cannot be undone.")) {
            deleteBlogPost(postId);
        }
    };

    const deleteBlogPost = async (postId) => {
        const { data, error } = await supabase
            .from('blogs')
            .delete()
            .match({ id: postId });
    
        if (error) {
            console.error('Error deleting blog post:', error);
        } else {
            // console.log('Blog post deleted:', data);
            // Optionally update the state to reflect the deletion
            setBlogs(blogs.filter(blog => blog.id !== postId));
            console.log('DELETED')
        }
    };
    
    


    useEffect(() => {
        if (!user) {
            console.error("User not authenticated");
            // setIsLoading(false);
            return;
          }
        const loadData = async () => {
            console.log('loading')
            const fetchedBlogs = await fetchBlogs(slug);
            console.log('passed')
            setBlogs(fetchedBlogs);
            fetchBlogIdeas(slug).then(setAiSuggestions);
            fetchUserKeywords();
            fetchAppName(slug);
            fetchIdeaTokens();
        };
      
        const fetchData = async () => {
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
            
        };

        if (slug) {
            loadData();
            fetchData();

        } else {
            return 'No Slug Identified'
        }
    }, [slug]);
    
    
    const handleEdit = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData(event.target);
            const title = formData.get('title');
            const content = formData.get('content');
            
            if (!user || !user.id || !slug) {
                console.error('User information or slug is missing');
                return;
            }
    
            const { data, error } = await supabase
                .from('blog')
                .update({ title, content })
                .match({ id: editBlogId }); // Use the editBlogId to update the correct post
    
            if (error) {
                console.error('Error updating data:', error);
            } else {
                // console.log('Updated data:', data);
                setBlogs(blogs.map(blog => blog.id === editBlogId ? {...blog, title, content} : blog));
                setToggled(false); // Close the edit form
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    
    const toggleBlogGrid = () => {
        setIsGrid(!isGrid);
    
      }

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


            /* KEYWORD FUNCTIONALITY */

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

            const handleGenerateClick = async () => {
                setToLoading(true);
                if (ideaTokens > 0 && ideaTokens != null) {
                try {
                    // Fetch app data
                    const { data: appData, error: fetchError } = await supabase
                        .from('apps') // Assuming 'apps' is your table name
                        .select('*')
                        .eq('id', slug);
            
                    if (fetchError) throw fetchError;
            
                    // Ensure you have app data before proceeding
                    if (appData) {
                        // Call API to generate blog ideas
                        const response = await fetch('/api/generateBlogIdeas', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ appsData: appData })
                        });
                        
                        const blogIdeas = await response.json();
                        console.log('API Response:', blogIdeas);

                        const userUpdateResponse = await supabase
                        .from('users')
                        .update({ idea_generation_tokens: ideaTokens - 1 })
                        .eq('id', user.id); // Replace 'userId' with the actual user ID
        
                        if (userUpdateResponse.error) {
                            throw userUpdateResponse.error;
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setToLoading(false);
                    setIdeaTokens(ideaTokens - 1);

                }
            } else {
                alert('You dont have any credits')
            }
            };
            


  return (
    <>
{/* {isToggled ? (
    <div className='blog-add-container'>
        <div className='blog-add-close' onClick={toggleAddForm}><IoMdClose /></div>
    <Generate />

</div>
) :  */}
{toggled ? (
    <div>
        <BlogEditForm toggle={toggleEditForm} blog={blogs.find(blog => blog.id === editBlogId)} submitForm={handleEdit} />
    </div>
)
:(
    <div className='blog-dashboard-container'>
                  {app &&   <Link href={`/dashboard/${app.id}`} className='sub-dash-back'><BsArrowLeft className='arrow' /></Link>}

        {/* {isToggled && <AddBlog submitForm={handleSubmit} toggle={toggleAddForm} />}
        {toggled && <BlogEditForm blog={blogs.find(blog => blog.id === editBlogId)} toggle={toggleEditForm} submitForm={handleEdit} />} */}
        <div className='dashboard-content-container'>
        {/* <button type='submit' className='add-content-container' onClick={toggleAddForm}><IoMdAdd /></button> */}
        <Link href={`/generate/${slug}`}><button className='add-content-container'><IoMdAdd /></button></Link>

            <h2 className='dash-content-header'>Blogs</h2>
            {blogs.length > 0 && <button onClick={toggleBlogGrid} className='toggle-grid'><BsGrid3X3GapFill /></button>}

            <div className={isGrid ? 'dash-content-grid': 'dash-content-grid-small'}>
            {blogs.map(blog => (
                <div key={blog.id} className='dash-content-grid-item searchresult'>
                    <div className='flexer search-result-flexer'>
                    <img src='/ranki-logo.png' className='serp-favicon'></img>
                    <div className='antiflexer'>
                        {/* <h6 className='serp-name'>RankiAI</h6> */}
                        {appName && <h6 className='serp-name'>{appName}</h6>}
                        {appDomain && blog.title && <a className='dash-content-link' rel='noreferrer' target="_blank" href={`https://${appDomain}/blog/${createSlug(blog.title)}`}>{truncateText(`https://${appDomain}/blog/${createSlug(blog.title)}`, 35)}</a>}
                      
                    </div>
                    </div>
                    <h2 className='content-item-header'>{blog.title}</h2>
                    <p className='serp-description'><span className='serp-date'>{formatDate(blog.created_at)} -</span> {blog.meta_description}</p>
                    {blog.is_published == true ? <h6 className='is-draft draft-published'>Published</h6>:<h6 className='is-draft'>Draft</h6>}

                    {/* Render other blog details as needed */}
                    <button onClick={() => handleDeleteBlog(blog.id)} className='delete-button blog-delete-btn'>
                            <IoMdClose />
                        </button>
                        <button onClick={() => toggleEditForm(blog.id)} className='edit-button blog-edit-btn'>
                            <BsThreeDotsVertical />
                        </button>
                </div>
            ))}
        
            </div>
        </div>
                <div className='dashboard-content-container'>
        <div className='dashboard-content-suggestions'>
        <div className='generate-credits-container'>

        {ideaTokens > 0 ? <p className='ai-gradient'>AI Credits: <span className='credits'>{ideaTokens}</span></p> : <p className='ai-gradient'>AI Credits: <span className='credits credits-red'>{ideaTokens}</span></p>}
</div>
            {/* {ideaTokens ? <p>You have {ideaTokens} credits</p>:<p>You dont have tokens</p> } */}
            <h2 className='blog-dashcontent-header'><span className='ai-gradient'>AI</span> Suggestions</h2>
                {aiSuggestions.length > 0 ? (
                    <div className='dash-content-grid-small'>
                        {aiSuggestions.slice(0,5).map(idea => (
                            <div key={idea.id} className='dash-content-grid-item searchresult grid-item-suggestion'>
                                    <div className='flexer search-result-flexer'>
                                        <img src='/ranki-logo.png' className='serp-favicon'></img>
                                        <div className='antiflexer'>
                                            {appName && <h6 className='serp-name'>{appName}</h6>}
                                            {appDomain && idea.title && <a className='dash-content-link' rel='noreferrer' target="_blank" >{truncateText(`https://${appDomain}/blog/${createSlug(idea.title)}`, 45)}</a>}
                                        
                                        </div>
                                        </div>
                                <h2 className='content-item-header'>{idea.title}</h2>
                                <p><span className='serp-date'>Jan 5, 2024 --</span> {truncateText(idea.description, 70)}</p>
                                {/* Render other details as needed */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='no-suggestions antiflexer'><p>No AI suggestions found.</p></div>
                )}
                <button onClick={handleGenerateClick} disabled={toLoading} className='btn btn-primary-2 btn-margin'>
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
          </div>
          <div className='dashboard-content-container'>

          <div className='keywords-dashcontent-container'>
          <h2 className='blog-dashcontent-header'>Ranking Keywords</h2>
                <button onClick={toggleKeywordAdd} className='btn-add add-btn addnew-keyword-btn'>
                    <IoMdAdd />
                </button>
                {visible && (
                    <form onSubmit={handleAddKeyword} className='add-keyword-form'>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={handleKeywordChange}
                            placeholder="Enter a new keyword"
                            className='keywords-container-input'
                        />
                        <button type="submit"><IoMdAdd /></button>
                    </form>
                )}

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
                                    <td>
                                        <button onClick={() => handleDeleteKeyword(keyword, slug)} className='delete-btn keyword-delete'>
                                            <IoMdClose />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {/* )} */}
                    </tbody>
                </table>
                </div>
                </div>
  </div>

  )
 }
</>

)}

export default BlogDash


// onClick={() => toggleEditForm(blog.id)}

    {/* <AddBlogOfficial submitForm={handleSubmit} toggle={toggleAddForm} /> */}



    // const handleSubmit = async (formData) => {
    //     // event.preventDefault();
        
    //     try {
    //         const title = formData.title;
    //         const content = formData.content;
            
    //         // Ensure user and slug are available
    //         if (!user || !user.id || !slug) {
    //             console.error('User information or slug is missing');
    //             return;
    //         }
    //         const formattedSlug = parseInt(slug, 10); 
    //         const { data, error } = await supabase
    //         .from('blog')
    //         .insert([
    //             { title, content, author_id: user.id, app_id: formattedSlug }
    //         ])        
    //         .select();

    //         if (error) {
    //             console.error('Error inserting data:', error);
    //         } else if (data) {
    //             console.log('Inserted data:', data);
    //         }
            
    //         if (data && data.length > 0) {
    //             // Update the blogs state to include the new blog post
    //             setBlogs(prevBlogs => [...prevBlogs, data[0]]);
    //             setIsToggled(false);
    //         } else {
    //             console.error('No data returned from Supabase');
    //         }
    
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
