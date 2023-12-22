import React, {useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const slug = 37;
  
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
  
  useEffect(() => {
    // if (!user) {
    //     console.error("User not authenticated");
    //     setIsLoading(false);
    //     return;
    //   }
    const loadData = async () => {
        const fetchedBlogs = await fetchBlogs(slug);
        setBlogs(fetchedBlogs);
    };
  
  
    if (slug) {
        loadData();
    } else {
        return 'No Slug Identified'
    }
  }, [slug]);
  return (
    <div className='blog-container'>
    {/* <h1 className='blog-header'>Blogs</h1> */}
    <div className='blog-grid-container'>
    {blogs && blogs.map(blog => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <div className='blog-grid-item'>
            <img className='blog-grid-img' src='/shop.webp' />
            <div className='blog-grid-text'>
              <h2 className='content-item-header blog-grid-item-header'>{blog.title}</h2>
              <p>{blog.content}</p>
              </div>
          </div>
          </Link>
      ))}
      </div>
</div>
  )
}

export default Blog
