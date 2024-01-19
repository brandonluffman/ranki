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
    const [isGrid, setIsGrid] = useState(false)
    // const [seoUrl, setSEOUrl] = useState('')
    const router = useRouter();
    const { slug } = router.query;

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
            .eq('app_id', slug);      
        if (error) {
            console.log('Faled to fetch', error)
        }
    
        return data;
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
    

    const handleSubmit = async (formData) => {
        // event.preventDefault();
        
        try {
            
            // const formData = new FormData(event.target);
            // console.log(formData, "Form Data")
            const title = formData.title;
            const content = formData.content;
            
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
                // console.log('Inserted data:', data);
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
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit'
        });
    };
    
    const toggleBlogGrid = () => {
        setIsGrid(!isGrid);
    
      }


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

  return (
    <>
{isToggled ? (
    <div className='blog-add-container'>
        <div className='blog-add-close' onClick={toggleAddForm}><IoMdClose /></div>
    {/* <AddBlogOfficial submitForm={handleSubmit} toggle={toggleAddForm} /> */}
    <Generate />

</div>
) : toggled ? (
    <div className='blog-add-container'>
        <BlogEditForm toggle={toggleEditForm} blog={blogs.find(blog => blog.id === editBlogId)} submitForm={handleEdit} />
    </div>
)
:(
    <div className='blog-dashboard-container'>
                  {app &&   <Link href={`/dashboard/${app.id}`} className='sub-dash-back'><BsArrowLeft className='arrow' /></Link>}

        {isToggled && <AddBlog submitForm={handleSubmit} toggle={toggleAddForm} />}
        {toggled && <BlogEditForm blog={blogs.find(blog => blog.id === editBlogId)} toggle={toggleEditForm} submitForm={handleEdit} />}


        <div className='dashboard-content-container'>
        <button type='submit' className='add-content-container' onClick={toggleAddForm}><IoMdAdd /></button>
            <h1 className='dash-content-header'>Content</h1>
            {blogs.length > 0 && <button onClick={toggleBlogGrid} className='toggle-grid'><BsGrid3X3GapFill /></button>}

            <div className={isGrid ? 'dash-content-grid-small': 'dash-content-grid'}>
            {blogs.map(blog => (
                <div key={blog.id} className='dash-content-grid-item searchresult'>
                    <div className='flexer search-result-flexer'>
                    <img src='/ranki-logo.png' className='serp-favicon'></img>
                    <div className='antiflexer'>
                        <h6 className='serp-name'>RankiAI</h6>
                   
                       {/* {isGrid ? (
                       <a href={`https://ranki.ai/blog/${createSlug(blog.title)}`}>
                        {truncateText(`https://ranki.ai/blog/${createSlug(blog.title)}`, 35)}
                            </a>
                            ):(
                            <a href={`https://ranki.ai/blog/${createSlug(blog.title)}`}>
                            https://ranki.ai/blog/{createSlug(blog.title)}
                       </a>
                       )}  */}
                      
                    </div>
                    </div>
                    <h2 className='content-item-header'>{blog.title}</h2>
                    <p className='serp-description'><span className='serp-date'>{formatDate(blog.created_at)} -</span> {blog.meta_description}</p>
                    {/* Render other blog details as needed */}
                    <button onClick={() => deleteBlogPost(blog.id)} className='delete-button blog-delete-btn'>
                            <IoMdClose />
                        </button>
                        <button onClick={() => toggleEditForm(blog.id)} className='edit-button blog-edit-btn'>
                            <BsThreeDotsVertical />
                        </button>
                </div>
            ))}
        
            </div>
        </div>
  </div>

  )
}
</>

)}

export default BlogDash


// onClick={() => toggleEditForm(blog.id)}