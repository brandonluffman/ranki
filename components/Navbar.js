<<<<<<< HEAD
import React, {useContext} from 'react';
import Link from 'next/link';
import { useEffect, useState, useRef  } from "react";
=======
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from "react";
>>>>>>> origin/main
import { BsSearch, BsXLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
const cors = require('cors');
import {RxHamburgerMenu} from 'react-icons/rx'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsCode,BsDot} from 'react-icons/bs'
import {GrCircleInformation} from 'react-icons/gr'
<<<<<<< HEAD
import { IoMdClose } from 'react-icons/io';
import { supabase } from '../utils/supabaseClient';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const { user, logout } = useContext(UserContext);

  const [hamburgerClass, setHamburgerClass] = useState('');
  const [navbarClass, setNavbarClass] = useState('');
  const dropdownRef = useRef(null);

  const toggleShow = () => {
    setActive(!isActive);
=======


const Navbar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const [suggestions, setSuggestions] = useState([])
  const [timeoutId, setTimeoutId] = useState(null);
  const [hamburgerClass, setHamburgerClass] = useState('');
  const [navbarClass, setNavbarClass] = useState('');

  const toggleShow = () => {
    setActive(!isActive);
    // console.log('Changed')
>>>>>>> origin/main
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
    if (window.scrollY > 100) {
      setNavbarClass('scrolled');
    } else {
      setNavbarClass('');
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHamburgerClass('');
      }
    };
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

=======
  const handleSubmit = (event) => {
    event.preventDefault();
    if (query  == '') {
        router.push(`/`);
    } else {
    router.push(`/ranking?q=${query}`);
    }
    };

    const handleChange = async (e) => {
      const value = e.target.value;
      setQuery(value);
  
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      if (!value) {
        setSuggestions([]);
        return;
      }
  
      // Set a new timeout to wait for 300ms before executing the event handler
      const newTimeoutId = setTimeout(async () => {
        try {
          const res = await axios.get(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/products/${value}/`);
          const sug = await res.data;
          setSuggestions(sug);
        } catch (error) {
          // Handle the error here (e.g. log it, display a message to the user)
        }
      }, 300);
  
      // Save the new timeout ID to the state for later use
      setTimeoutId(newTimeoutId);
    };
>>>>>>> origin/main

  return (
    <nav className={`navbar ${navbarClass}`}>
          <div className='nav-logo-container'>
<<<<<<< HEAD
          <Link href='/' className='nav-logo-link flexer'><img src='/chatbot.png' alt='Brand Logo' className='nav-logo chatbot-logo'></img><img src='/R.png' alt='Brand Logo' className='nav-logo'></img></Link>
          </div>

        <div className={`nav-menu-toggle ${hamburgerClass}`} ref={dropdownRef}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'><img src='/RankiAI.png' className='nav-img'></img></h2>
            <div className='mobile-nav-link-container'>
            <Link className='nav-link' href='/'><BiHomeAlt2 className='nav-icon'/> Home</Link>
            <Link className='nav-link' href='/dashboard'><BsCode className='nav-icon'/> Dashboard</Link>
            <Link className='nav-link' href='/about'><GrCircleInformation className='nav-icon'/> About</Link>
            {/* <Link className='nav-link' href='/ranking'><GrCircleInformation className='nav-icon'/> Rankings</Link> */}
            </div>
            </div>
        </div>
        <div className='login-menu'>
        {user ? (
              <div className='login-nav-link'>
                {/* <div className='profile-circle'>
                  <div className='profile-circle-letter'>B</div>
                  </div> */}
                <div className='profile-nav'>     
                
                {/* <p className='profile-circle-email'>Hello {user?.user.email}</p> */}
   
                <button className='logout-nav-btn logout-logged-in btn nav-btn btn-tertiary' onClick={logout}>
                  Logout
                </button>
                </div>
      
                {/* <h1>Welcome, Brandon</h1> */}
        
              </div>
            ) : (
              <div className='nav-link desktop-nav-link'>
                <li className='nav-link nav-link-btn-li'>
                  <Link href='/login'>
                    {/* <button type='button' className={navbar ? 'nav-link-btn nav-login-btn btn btn-primary':'nav-link-btn nav-login-btn-scrolled btn btn-primary'}>
                      Log In
                    </button> */}
                    <button type='button' className='nav-link-btn nav-login-btn-scrolled btn btn-white'>
                      Login
                    </button>
                  </Link>
                </li>
                <li className='nav-link nav-link-btn-li'>
                  <Link href='/register'>
                    <button type='button' className='nav-link-btn nav-signup-btn btn btn-white'>
                      Sign Up
                    </button>
                  </Link>
                </li>
              </div>
            )}
            </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}>{isActive ? (<IoMdClose />):(<RxHamburgerMenu />)}</button> 
=======
          <Link href='/' className='nav-logo-link'><img src='/R.png' alt='Brand Logo' className='nav-logo'></img></Link>
          </div>
        <div className='nav-form-flexer'>
        <form className={isActivate ? 'nav-form-expanded':'nav-form'} onSubmit={handleSubmit} autoComplete='off'>
                <input
                type="text"
                id="firstName"
                value={query}
                onChange={handleChange}
                // name="firstName"
                className="nav-landing-input"
                placeholder='Search for a product...'
              />
              <div className='input-suggestions nav-input-suggestions'>
              {Array.isArray(suggestions) && (
                suggestions.slice(0,10).map((suggestion,i) => (
                  suggestion.length == 4 ? (
                  <Link href={`product/${suggestion[0]}`} key={suggestion[0]} className='input-suggestion-div'>
                    {suggestion[1] == 'hello' ? (
                      <img src='/zon.png' width='30'></img>
                    ):(
                      <img src={suggestion[2]} className='product-suggestion-img'></img>
                    )}
                    <p>{suggestion[1]}</p><p className='kind-color-product'><BsDot /> PRODUCT</p>
                    </Link>
                  ): (
                    <Link href={`/ranking?q=${suggestion}`} key={suggestion} className='input-suggestion-div query-suggestion'>
                      <div>{suggestion}</div><p className='kind-color-query'><BsDot /> QUERY</p>
                    </Link>
                  )
                ))
              )}
            </div> 
        </form>
        {isActivate ? (
          <button className='nav-toggle-button' type='button' onClick={toggleClass}><BsXLg /></button>
        ):(
          <button className='nav-toggle-button-clicked' type='button' onClick={toggleClass}><BsSearch /></button>
        )
        }
        </div>
        <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'><img src='/RankiAI.png' width='300'></img></h2>
            <Link className='nav-link' href='/'><BiHomeAlt2 className='nav-icon'/> Home</Link>
            <Link className='nav-link' href='/home'><img src='/ranki.png' width='25' className='nav-icon nav-icon-img'></img> Beta</Link>
            <Link className='nav-link' href='/about'><BsCode className='nav-icon'/> About</Link>
            <Link className='nav-link' href='/ranking'><GrCircleInformation className='nav-icon'/> Rankings</Link>
            </div>
        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}><RxHamburgerMenu /></button> 
        {/* <div className='extension-div'>
          <button className='extension-btn'><img src='/chrome.png' width='20'></img>Download on Chrome</button>
        </div> */}
>>>>>>> origin/main
    </nav>
  )
}

<<<<<<< HEAD
export default Navbar

=======
export default Navbar
>>>>>>> origin/main
