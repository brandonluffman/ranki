import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import Breadcrumbs from './Breadcrumbs';
import { useRouter, router } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';
import { BsThreeDotsVertical } from 'react-icons/bs';

const DashContent = ({ slug }) => {
      const { user } = useContext(UserContext);
      const [isToggled, setIsToggled] = useState(false);
      const [blogs, setBlogs] = useState([]);
  
      const toggleAddForm = () => {
          setIsToggled(prev => !prev);
      }
  
      const fetchBlogs = async (slug) => {
            console.log('Initiatyed Blog Fetch, Here is the provided slug: ', slug)
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

      useEffect(() => {
            const loadData = async () => {
                  console.log('In the use effect')
                const fetchedBlogs = await fetchBlogs(slug);
                console.log('Made it past the fetfch')
                setBlogs(fetchedBlogs);
                console.log('Tried to set blogs lets console them: ', blogs)
            };
    
            loadData();
        }, []);

        const formatDate = (isoString) => {
            const date = new Date(isoString);
            return date.toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit'
            });
        };
  return (
      <div className='blog-dashcontent-container'>
      {/* <div className={isToggled ? 'blog-dashboard-addform-container': 'blog-dashboard-addform-container-noshow'}>
      <form onSubmit={handleSubmit} className='blog-add-form'>
          <h2>Add Blog</h2>
          <input type='text' className='dashboard-addform-input' name='title' placeholder='Blog Title' required />
          <textarea className='dashboard-addform-input' name='content' placeholder='Content' required />
          <button type='submit' className='dashboard-addform-btn btn btn-primary'>Add Blog</button>
      </form>
      </div> */}
      <div className='dashboard-content-container'>
      {/* <button type='submit' className='add-content-container' onClick={toggleAddForm}><IoMdAdd /></button> */}
          <h1 className='blog-dashcontent-header'>Content</h1>
          <div className='dash-content-grid'>
          {/* {blogs && blogs.length > 0 ? (
            blogs.map(blog => (
                <div key={blog.id} className='dash-content-grid-item'>
                    <h2 className='content-item-header'>{blog.title}</h2>
                    <p>{blog.content}</p>
                  
                </div>
            ))   */}
              {/* <button onClick={() => deleteBlogPost(blog.id)} className='delete-button'>
                        Delete
                    </button> */}

            {blogs && blogs.length > 0 ? 
            blogs.map(blog => (
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
                    <p className='serp-description'><span className='serp-date'>{formatDate(blog.created_at)} -</span> {blog.content}</p>
                    {/* Render other blog details as needed */}
                    {/* <button onClick={() => deleteBlogPost(blog.id)} className='delete-button blog-delete-btn'>
                            <IoMdClose />
                        </button>
                        <button onClick={() => toggleEditForm(blog.id)} className='edit-button blog-edit-btn'>
                            <BsThreeDotsVertical />
                        </button> */}
                </div>
            ))
        
         : (
            <div className='no-blogs'><p>No blogs found, start growing your sites Google Rankings now by creating content <Link href={`/blogdashboard/${slug}`} className='link'>here</Link></p></div>
        )}
          </div>
      </div>
</div>
  )
}

export default DashContent