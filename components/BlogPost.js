import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { BsArrowLeft, BsBook, BsBookFill, BsDot, BsLightbulb, BsLightbulbFill } from 'react-icons/bs';
import CTA from './CTA';
import Breadcrumbs from './Breadcrumbs';
import ProgressBar from "react-scroll-progress-bar";
import DOMPurify from 'dompurify';

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'next-share';
// import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from '../utils/supabaseClient';


const BlogPost = ({ blog }) => {
  const [isDark, setIsDark] = useState(true);
  const [floatClass, setFloatClass] = useState('');
  const [blogData, setBlogData] = useState(null);
  const [images, setImages] = useState([]);
  const [readingTime, setReadingTime] = useState(0);
  const blogId = blog ? blog.id : '';

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
      const fetchBlogData = async () => {
        try {
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', blogId)
            .single();
    
          if (error) throw error;
    
          setBlogData(data);
          const readingTime = calculateReadingTime(blog.content);

          setReadingTime(readingTime)
    
          // Parse the images JSON string into an array
          let imagePaths = data.images ? JSON.parse(data.images) : [];
          setImages(imagePaths); // Directly use the parsed array
          console.log(imagePaths)
        } catch (error) {
          console.error('Error fetching blog data:', error);
        }
      };
    
      if (blogId) {
        fetchBlogData();
      }
    }, [blogId]);
    
    const calculateReadingTime = (text) => {
      const wordsPerMinute = 200; // Average reading speed
      const textLength = text.split(/\s+/).length; // Split by spaces to calculate word count
      if (textLength > 0) {
          const readingTime = Math.ceil(textLength / wordsPerMinute);
          return readingTime;
      }
      return 0;
  };
  
    

    const handleScroll = () => {
      // Get the total height of the document
      const totalHeight = document.documentElement.scrollHeight;
    
      // Define your desired percentages
      const upperPercentage = 10; // Example: 20% of the page
      const lowerPercentage = 60; // Example: 100% of the page
    
      // Calculate the actual pixel values based on percentages
      const upperLimit = totalHeight * (upperPercentage / 100);
      const lowerLimit = totalHeight * (lowerPercentage / 100);
    
      // Check if the current scroll position is within the desired range
      if (window.scrollY > upperLimit && window.scrollY < lowerLimit) {
        setFloatClass('float');
      } else {
        setFloatClass('');
      }
    };
    

    const toggleDark = () => {
      setIsDark(!isDark)
    }

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

    const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <div className={isDark ? 'blog-post-container dark-post': 'blog-post-container'}>
      <Breadcrumbs />
        {/* <button className='blog-post-dark-toggle'><BsLightbulbFill onClick={toggleDark} /></button> */}
        <div className={`nofloat ${floatClass}`}>FLOATING</div>
        {images.length > 0 ? 
              images.map((url, index) => (
                <img key={index} src={url} alt={`Blog Image ${index + 1}`} className="blog-post-cover" />
              ))
              :    <img src='/dashboard.png' className='blog-post-cover'></img>

            }

        {/* <h1 className='blog-post-header'>{blog.title}</h1> */}
        <div className='flexer blog-post-details'>
          <p className='blog-author flexer'><img src='/headshot.webp' width='30'></img> <b>Ranki AI</b></p>
        <p className='blog-post-date'>{formatDate(blog.created_at)}</p>
        <p className='blog-readtime flexer'><BsBookFill className='arrow'/> {readingTime} min read</p>
        </div>
        {/* <h6 className='blog-post-content'>{blog.content}</h6> */}
        <HTMLContent html={sanitizedContent} /> 

        <CTA />

    </div>
  )
}

const HTMLContent = ({ html }) => {
  return <div className='blog-content' dangerouslySetInnerHTML={{ __html: html }} />;
};


export default BlogPost



    // const fetchPublicUrls = async (imagePaths) => {
    //   return imagePaths.map(path => {
    //     const { publicURL, error } = supabase.storage
    //       .from('blogimages')
    //       .getPublicUrl(path);
    
    //     if (error) {
    //       console.error('Error fetching public image URL:', error);
    //       return null;
    //     }
    
    //     return publicURL;
    //   }).filter(url => url != null); // Filter out any null URLs
    // };
    
    // const fetchPublicUrls = async (imagePaths) => {
    //   try {
    //     console.log(imagePaths)
    //     const urls = await Promise.all(
    //       imagePaths.map(async (path) => {
    //         const { publicURL, error } = supabase.storage
    //           .from('blogimages')
    //           .getPublicUrl(path);
    
    //         if (error) {
    //           console.error('Error fetching public image URL:', error);
    //           return null;
    //         }
    //         console.log(publicURL)

    //         return publicURL;
    //       })
    //     );
    
    //     return urls.filter(url => url != null); // Filter out any null URLs
    //   } catch (error) {
    //     console.error('Error fetching public URLs:', error);
    //     return [];
    //   }
    // };
    


    // {blog && console.log(blog)}
    // useEffect(() => {
    //     // if (!user) {
    //     //     console.error("User not authenticated");
    //     //     setIsLoading(false);
    //     //     return;
    //     //   }
    //     const fetchData = async () => {
    //         if (slug) {
    //             try {
    //                 const { data, error } = await supabase
    //                     .from('blog')
    //                     .select('*')
    //                     .eq('id', slug)
    //                     .single();
                    
    //                 if (error) throw error;
    //                 setApp(data);
    //                 // fetchPages(data.domain);
    //             } catch (error) {
    //                 console.error('Error fetching app:', error);
    //             }
    //         }
    //     };
    //     fetchData();
    // }, [slug]);


      //   const fetchImageUrl = async (path) => {
  //     const { signedURL, error } = await supabase.storage
  //         .from('blogimages')
  //         .createSignedUrl(path, 60); // 60 is the expiration time in seconds
  
  //     if (error) {
  //         console.error('Error fetching image URL:', error);
  //         return null;
  //     }
  
  //     return signedURL;
  // };