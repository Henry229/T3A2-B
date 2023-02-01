import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header>
      <Link to='/' className='title'>
        The Gangnam Style BBQ
      </Link>
      <nav>
        <Link to='/menu'>Menu</Link>
        <Link to='/reservation'>Reservation</Link>
        <Link to='/aboutUs'>About us</Link>
        <Link to='/admin'>Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
