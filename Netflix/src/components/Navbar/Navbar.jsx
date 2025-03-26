import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import profile_icon from '../../assets/profile_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSearchActive]);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <div ref={searchRef} className={`search-bar ${isSearchActive ? 'active' : ''}`}>
          <img 
            src={search_icon} 
            alt="search" 
            className="icons" 
            onClick={() => setIsSearchActive(!isSearchActive)} 
          />
          {isSearchActive && <input type="text" placeholder="Titles, people, genres" />}
        </div>
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt=""/>
          <div className="dropdown">
            <p><img src={profile_icon} alt="" className="dropdown-icon" />Manage Profiles</p>
            <br />
            <p><img src={profile_icon} alt="" className="dropdown-icon" />Transfer Profile</p>
            <br />
            <p><img src={profile_icon} alt="" className="dropdown-icon" />Account</p>
            <br />
            <p><img src={profile_icon} alt="" className="dropdown-icon" />Help Center</p>
            <br />
            <p onClick={() => { logout(); }}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
