import React from 'react';
import { GrRestaurant } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './header.css'

const Header = () => {
  return (
    <header>
      <Link to='/'><p>The Gangnam Style BBQ</p></Link>
      <nav>
        <ul>
          <li><Link to='/menu'>Menu</Link></li>
          <li><Link to='/reservation'>Reservation</Link></li>
          <li><Link to='/aboutUs'>About Us</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
