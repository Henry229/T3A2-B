import React from 'react';
import { GrRestaurant } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
  return (
    <header>
      <Link to='/' className='title'>The Gangnam Style BBQ</Link>
      <nav>
          <Link to='/menu'>Menu</Link>
          <Link to='/reservation'>Reservation</Link>
          <Link to='/aboutUs'>About Us</Link>
          <Link to='/admin'>Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
