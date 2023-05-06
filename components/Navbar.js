import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsSearch, BsXLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import axios from 'axios';
const cors = require('cors');
import {RxHamburgerMenu} from 'react-icons/rx'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsCode} from 'react-icons/bs'
import {GrCircleInformation} from 'react-icons/gr'


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
    console.log('Changed')
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query  == '') {
        router.push(`/`);
    } else {
    router.push(`/ranking?q=${query}`);
    }
    };

const handleChange = async (e) => {
    if (e.target.value != ''){
        setQuery(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    
        // Set a new timeout to wait for 1 second before executing the event handler
        const newTimeoutId = setTimeout(async () => {
            const res = await axios.get(`http://3.130.4.98/blackwidow/products/${e.target.value}/`);
            // const res = await axios.get(`http://127.0.0.1:8000/blackwidow/products/${e.target.value}`);
            const sug = await res.data;
            setSuggestions(sug)
        }, 1000);
    
        // Save the new timeout ID to the state for later use
        setTimeoutId(newTimeoutId);
    
    } else {
        setQuery('');
        console.log('nada')
    }
};

  return (
    <nav className={`navbar ${navbarClass}`}>
        <div className='nav-logo-container'>
        <Link href='/'>
          <img src='/ranki.png' alt='Brand Logo' className='nav-logo'></img>
        </Link>
        </div>
        <div className='nav-form-flexer'>
        <form className={isActivate ? 'nav-form-expanded':'nav-form'} onSubmit={handleSubmit}>
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
                suggestions.map((suggestion,i) => (
                  <Link href={`product/${suggestion[0]}`} key={suggestion[0]} className='input-suggestion-div'>
                    {suggestion[1] == 'hello' ? (
                      <img src='/zon.png' width='50'></img>
                    ):(
                      <img src={suggestion[2]} width='50'></img>
                    )}
                    <p>{suggestion[1]}</p>
                    </Link>
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
        {/* <div className='nav-menu'>
            <Link className='nav-link' href='/'>Home</Link>
            <Link className='nav-link' href='/about'>About</Link>
            <Link className='nav-link' href='/ranking'>Rankings</Link>
        </div> */}
        <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'>RANKI <span className='header-color'>AI</span></h2>
            <Link className='nav-link' href='/'><BiHomeAlt2 className='nav-icon'/> Home</Link>
            <Link className='nav-link' href='/about'><BsCode className='nav-icon'/> About</Link>
            <Link className='nav-link' href='/ranking'><GrCircleInformation className='nav-icon'/> Rankings</Link>
            </div>
        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}><RxHamburgerMenu /></button> 
    </nav>
  )
}

export default Navbar