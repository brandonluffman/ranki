import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Dashboard from '../../components/Dashboard';
import { useRouter, router } from 'next/router';
import BlogDash from '../../components/BlogDash';
import Breadcrumbs from '../../components/Breadcrumbs';

const BlogDashboardSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  return ( 
    <>
      <Navbar />
      {slug && <BlogDash setSlug={slug} />}
      <Footer />
    </>
  );
};

export default BlogDashboardSlug;
