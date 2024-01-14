import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dashboard from '../../components/Dashboard';
import { useRouter, router } from 'next/router';
import BlogDash from '../../components/BlogDash';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogPost from '../../components/BlogPost';
import { supabase } from '../../utils/supabaseClient';
import { UserContext } from '../../context/UserContext';
import Head from 'next/head';

const BlogPostSlug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState([])
  const { user, logout } = useContext(UserContext);
const [isAuthor, setIsAuthor] = useState(false)
  useEffect(() => {
    // if (!user) {
    //     console.error("User not authenticated");
    //     setIsLoading(false);
    //     return;
    //   }
    const fetchData = async () => {

        if (slug) {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', slug)
                    .single();
                
                if (error) throw error;
                setBlog(data);
                // fetchPages(data.domain);
            } catch (error) {
                console.error('Error fetching app:', error);
            }
        }
    };
    if (blog && user && user.id == blog.author_id) {
        console.log("User is the author!");
        setIsAuthor(true)
      }
    fetchData();
}, [slug]);


  return ( 
    <>
           <Head>  
<title>RankiAI Blog | {blog && blog.title}</title>
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Organization",
               "url": "https://www.phantomdm.com",
               "logo": "https://www.phantom.com/public/img.png"
             })}}
         />
         <meta name="description" content="Phantom Technologies is an AI firm that specializes in the development of data-driven applications."/>
         <meta charSet="utf-8" />
         <meta name="robots" content="index, follow" />
         <meta name="viewport" content="width=device-width, initial-scale=1"/>
         <link rel="icon" type="image/png" href="/img.png" alt="Favicon" />
         <link rel="apple-touch-icon" href="/img.png" />
         <link rel="canonical" href="https://phantomdm.com/"/>
           <meta property="og:type" content="article" />
           <meta property="og:title" content="TITLE OF YOUR POST OR PAGE" />
           <meta property="og:description" content="DESCRIPTION OF PAGE CONTENT" />
           <meta property="og:image" content="LINK TO THE IMAGE FILE" />
           <meta property="og:url" content="PERMALINK" />
           <meta property="og:site_name" content="SITE NAME" />
           <meta name="twitter:title" content="TITLE OF POST OR PAGE" />
           <meta name="twitter:description" content="DESCRIPTION OF PAGE CONTENT" />
           <meta name="twitter:image" content="LINK TO IMAGE" />
           <meta name="twitter:site" content="@USERNAME" />
           <meta name="twitter:creator" content="@USERNAME" />
     </Head>
      <Navbar />
      {slug && <BlogPost blog={blog} />}
      {/* {isAuthor && <h1>You da author bro</h1>} */}

      <Footer />
    </>
  );
};

export default BlogPostSlug;