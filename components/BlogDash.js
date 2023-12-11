import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import Breadcrumbs from './Breadcrumbs';
import { useRouter, router } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

const BlogDash = () => {
    const { user } = useContext(UserContext);
    const [isToggled, setIsToggled] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [app, setApp] = useState(null);

    const router = useRouter();
    const { slug } = router.query;

    const toggleAddForm = () => {
        setIsToggled(prev => !prev);
    }

    const fetchBlogs = async (slug) => {
        const { data, error } = await supabase
            .from('blog')
            .select('*')
            .eq('app_id', slug);
    
        if (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    
        return data;
    };

    const deleteBlogPost = async (postId) => {
        const { data, error } = await supabase
            .from('blog')
            .delete()
            .match({ id: postId });
    
        if (error) {
            console.error('Error deleting blog post:', error);
        } else {
            console.log('Blog post deleted:', data);
            // Optionally update the state to reflect the deletion
            setBlogs(blogs.filter(blog => blog.id !== postId));
        }
    };
    
    


    useEffect(() => {
        if (!user) {
            console.error("User not authenticated");
            setIsLoading(false);
            return;
          }
        const loadData = async () => {
            const fetchedBlogs = await fetchBlogs(slug);
            setBlogs(fetchedBlogs);
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
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData(event.target);
            const title = formData.get('title');
            const content = formData.get('content');
            
            // Ensure user and slug are available
            if (!user || !user.id || !slug) {
                console.error('User information or slug is missing');
                return;
            }
            const formattedSlug = parseInt(slug, 10); 
            const { data, error } = await supabase
            .from('blog')
            .insert([
                { title, content, author_id: user.id, app_id: formattedSlug }
            ])        
            .select();

            if (error) {
                console.error('Error inserting data:', error);
            } else if (data) {
                console.log('Inserted data:', data);
                // Here, 'data' will be an array containing the inserted row(s)
            }
            
            if (data && data.length > 0) {
                // Update the blogs state to include the new blog post
                setBlogs(prevBlogs => [...prevBlogs, data[0]]);
                setIsToggled(false);
            } else {
                console.error('No data returned from Supabase');
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

  return (

    <div className='blog-dashboard-container'>
                  {app &&   <Link href={`/dashboard/${app.id}`} className='sub-dash-back'><BsArrowLeft className='arrow' />Back to the {app.name} Dashboard</Link>}

        <div className={isToggled ? 'blog-dashboard-addform-container': 'blog-dashboard-addform-container-noshow'}>
        <form onSubmit={handleSubmit} className='blog-add-form'>
            <h2>Add Blog</h2>
            <input type='text' className='dashboard-addform-input' name='title' placeholder='Blog Title' required />
            <textarea className='dashboard-addform-input' name='content' placeholder='Content' required />
            <button type='submit' className='dashboard-addform-btn btn btn-primary'>Add Blog</button>
        </form>
        </div>



        <div className='dashboard-content-container'>
        <button type='submit' className='add-content-container' onClick={toggleAddForm}><IoMdAdd /></button>
            <h1>Content</h1>
            <div className='dash-content-grid'>
            {blogs.map(blog => (
                <div key={blog.id} className='dash-content-grid-item'>
                    <h2 className='content-item-header'>{blog.title}</h2>
                    <p>{blog.content}</p>
                    {/* Render other blog details as needed */}
                    <button onClick={() => deleteBlogPost(blog.id)} className='delete-button blog-delete-btn'>
                            <IoMdClose />
                        </button>
                </div>
            ))}
            </div>
        </div>


        {/* <div className='blog-dash-grid'>
            <div className='blogdash-item'>
                Keywords
            </div>
            <div className='blogdash-item'>
                Keyword Rankings & Volume
            </div>
            <div className='blogdash-item'>
                Potential Keywords to Use & Other Suggestions to Up SEO
            </div>
        </div> */}
  </div>
  )
}

export default BlogDash
