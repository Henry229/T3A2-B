import React from 'react';
import { GrRestaurant } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to='/'>
        <GrRestaurant />
      </Link>
      <ul>
        <li>
          <Link to='/menu'>Menu</Link>
        </li>
        <li>
          <Link to='/reservation'>Reservation</Link>
        </li>
        <li>
          <Link to='/aboutUs'>About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
