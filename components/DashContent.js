import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { UserContext } from '../context/UserContext';
import Breadcrumbs from './Breadcrumbs';
import { useRouter, router } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

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
          {blogs && blogs.length > 0 ? (
            blogs.map(blog => (
                <div key={blog.id} className='dash-content-grid-item'>
                    <h2 className='content-item-header'>{blog.title}</h2>
                    <p>{blog.content}</p>
                    {/* <button onClick={() => deleteBlogPost(blog.id)} className='delete-button'>
                        Delete
                    </button> */}
                </div>
            ))
        ) : (
            <div className='no-blogs'><p>No blogs found, start growing your sites Google Rankings now by creating content <Link href={`/blogdashboard/${slug}`} className='link'>here</Link></p></div>
        )}
          </div>
      </div>
</div>
  )
}

export default DashContent