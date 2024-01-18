import React, {useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

const Blog = (limit) => {
    const [blogs, setBlogs] = useState([]);
    const [images, setImages] = useState([]);

    const slug = 84;

    useEffect(() => {
      const fetchBlogs = async (slug) => {
        try {
          const { data, error } = await supabase
              .from('blogs')
              .select('*')
              .eq('app_id', slug);
      
          if (error) throw error;
          setBlogs(data); // Set the blogs data here
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };
    
      fetchBlogs(slug);
    }, [slug]);

    const parseImages = (imageData) => {
      try {
        // Try parsing as JSON
        return JSON.parse(imageData);
      } catch {
        // If parsing fails, treat it as a single URL string
        return [imageData]; // Wrapping the single URL in an array
      }
    };
    

  return (
    <div className='blog-container'>
    <h1 className='blog-header'>Blogs</h1>
    <div className='blog-grid-container'>
      {blogs && blogs.map(blog => {
        // Parse the images for each blog
        const blogImages = blog.images ? parseImages(blog.images) : ['/shop.webp']; // Default image if none

        return (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className='blog-grid-item'>
              <div className='blog-grid-img-container flexer'>
            {blogImages.map((url, index) => (
                    <img key={index} src={url} alt={`Blog Image ${index + 1}`} className="blog-grid-img" />
                  ))}
                  </div>
              <div className='blog-grid-text'>
                <h2 className='content-item-header blog-grid-item-header'>{blog.title}</h2>
                <p>{blog.meta_description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
  )
}

export default Blog
