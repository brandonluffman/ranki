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


const BlogPost = ({ blog }) => {
    const [isDark, setIsDark] = useState(true);
    const [floatClass, setFloatClass] = useState('')
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

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      if (window.scrollY > 200 && window.scrollY < 1000) {
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
        <button className='blog-post-dark-toggle'><BsLightbulbFill onClick={toggleDark} /></button>
        <div className={`nofloat ${floatClass}`}>FLOATING</div>

        <img src='/dashboard.png' className='blog-post-cover'></img>

        <h1 className='blog-post-header'>{blog.title}</h1>
        <div className='flexer blog-post-details'>
          <p className='blog-author flexer'><img src='/headshot.webp' width='30'></img> <b>Ranki AI</b></p>
        <p className='blog-post-date'>{formatDate(blog.created_at)}</p>
        <p className='blog-readtime flexer'><BsBookFill className='arrow'/> 4 min read</p>
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
