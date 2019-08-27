import React from 'react'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'

/*
 * Header: Navigation menu that provides links to show the HTML
 * corresponding with each endpoint (create, develop, and test).
*/
const Header = () => (
  // return navigation menu
  <div className='header'>
    <img id='logo' src='/public/assets/amida-logo.png' alt="Amida logo"></img>
    <div id='nav-bar-div'>
      <ul>
        <li><Link to="/" className='react-link'>HOME</Link></li>
        <li><Link to="/create" className='react-link'>CREATE</Link></li>
        <li><Link to="/develop" className='react-link'>DEVELOP</Link></li>
        <li><Link to="/test" className='react-link'>TEST</Link></li>
      </ul>
    </div>
  </div>
)

// hot-reload page
export default hot(module)(Header)
