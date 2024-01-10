import React, {useContext} from 'react';
import Link from 'next/link';
import { useEffect, useState, useRef  } from "react";
import { BsSearch, BsXLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
const cors = require('cors');
import {RxHamburgerMenu} from 'react-icons/rx'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsCode,BsDot} from 'react-icons/bs'
import {GrCircleInformation} from 'react-icons/gr'
import { IoMdClose, IoMdPricetags } from 'react-icons/io';
import { supabase } from '../utils/supabaseClient';
import { UserContext } from '../context/UserContext';
import { IoNewspaper } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const { user, logout } = useContext(UserContext);

  const [hamburgerClass, setHamburgerClass] = useState('');
  const [navbarClass, setNavbarClass] = useState('');
  const dropdownRef = useRef(null);

  const toggleShow = () => {
    setActive(!isActive);
  };
  
  const handleShow = () => {
    if (isActive) {
      setHamburgerClass('nav-menu-toggled');
    } else {
      setHamburgerClass('');
    }
  };
  
  useEffect(() => {
    handleShow();
  }, [isActive]);

  const toggleClass = () => {
    setActivate(!isActivate);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setNavbarClass('scrolled');
    } else {
      setNavbarClass('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHamburgerClass('');
        setActive(false)
      }
    };
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <nav className={`navbar ${navbarClass}`}>
          <div className='nav-logo-container'>
          <Link href='/' className='nav-logo-link flexer'><img src='/chatbot.png' alt='Brand Logo' className='nav-logo chatbot-logo'></img><img src='/R.png' alt='Brand Logo' className='nav-logo'></img></Link>
          </div>

        <div className={`nav-menu-toggle ${hamburgerClass}`} ref={dropdownRef}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'><img src='/RankiAI.png' className='nav-img'></img></h2>
            <div className='mobile-nav-link-container'>
            <Link className='nav-link' href='/'><BiHomeAlt2 className='nav-icon'/> Home</Link>
            <Link className='nav-link' href='/dashboard'><BsCode className='nav-icon'/> Projects</Link>
            <Link className='nav-link' href='/pricing'><IoMdPricetags className='nav-icon'/> Pricing</Link>
            <Link className='nav-link' href='/blog'><IoNewspaper className='nav-icon'/> Blog</Link>
            <Link className='nav-link' href='/account'><CgProfile className='nav-icon'/> Account</Link>

            <Link className='nav-link' href='/about'><GrCircleInformation className='nav-icon'/> About</Link>
            {/* <Link className='nav-link' href='/ranking'><GrCircleInformation className='nav-icon'/> Rankings</Link> */}
            </div>
            </div>
        </div>
        <div className='login-menu'>
        {user ? (
              <div className='login-nav-link'>
                <button className='logout-nav-btn logout-logged-in btn nav-btn btn-secondary nav-log-btn' onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className='nav-link desktop-nav-link'>
                <li className='nav-link nav-link-btn-li'>
                  <Link href='/login'>
                    {/* <button type='button' className={navbar ? 'nav-link-btn nav-login-btn btn btn-primary':'nav-link-btn nav-login-btn-scrolled btn btn-primary'}>
                      Log In
                    </button> */}
                    <button type='button' className='nav-link-btn nav-login-btn-scrolled btn btn-primary nav-log-btn'>
                      Login
                    </button>
                  </Link>
                </li>
                <li className='nav-link nav-link-btn-li'>
                  <Link href='/register'>
                    <button type='button' className='nav-link-btn nav-signup-btn btn btn-tertiary nav-log-btn'>
                      Sign Up
                    </button>
                  </Link>
                </li>
              </div>
            )}
            </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}>{isActive ? (<IoMdClose />):(<RxHamburgerMenu />)}</button> 
    </nav>
  )
}

export default Navbar

