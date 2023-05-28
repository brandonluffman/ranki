import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs';
import {RxHamburgerMenu} from 'react-icons/rx'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsCode} from 'react-icons/bs'
import {GrCircleInformation} from 'react-icons/gr'

const NavbarNI = () => {
  const [isActive, setActive] = useState(false);
  const [navbarClass, setNavbarClass] = useState('');
  const [hamburgerClass, setHamburgerClass] = useState('');

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

  return (
    <nav className={`navbar ${navbarClass}`}>
        <div>
          {/* <Link className='nav-logo-link' href='/'> */}
        <img src='/ranki-logoo.png' alt='Brand Logo' className='nav-logo'></img>
        {/* </Link> */}
        </div>
         <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'>RANKI <span className='header-color'>AI</span></h2>
            <Link className='nav-link' href='/'><BiHomeAlt2 className='nav-icon'/> Home</Link>
            <Link className='nav-link' href='/home'><BiHomeAlt2 className='nav-icon'/> Beta</Link>
            <Link className='nav-link' href='/about'><BsCode className='nav-icon'/> About</Link>
            <Link className='nav-link' href='/ranking'><GrCircleInformation className='nav-icon'/> Rankings</Link>
            </div>
        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}><RxHamburgerMenu /></button> 
    </nav>
  )
}

export default NavbarNI