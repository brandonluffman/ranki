import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs';



const NavbarNI = () => {

  const [navbarClass, setNavbarClass] = useState('');

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
        <img src='/ranki.png' alt='Brand Logo' className='nav-logo'></img>
        </div>
        <div className='nav-menu'>
            <Link className='nav-link' href='/'>Home</Link>
            <Link className='nav-link' href='/about'>About</Link>
            <Link className='nav-link' href='/ranking'>Rankings</Link>
            {/* <Link className='nav-link' href='/about'>Contact</Link> */}
        </div>
    </nav>
  )
}

export default NavbarNI