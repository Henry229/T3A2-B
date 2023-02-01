import React from 'react';
import { Link } from 'react-router-dom';
// import './header.css';

const Header = () => {
  return (
    <header className='w-full flex flex-col justify-center p-4 text-2xl border-b border-zinc-600 bg-darkBlue md:flex-row justify-between '>
      <Link to='/'>
        <h1 className='font-bold text-3xl text-grey-50 text-center my-4 ml-3'>
          The GangNam Style BBQ
        </h1>
      </Link>
      <nav className='flex flex-col text-center text-xl  text-orange-400 my-4 sm:flex-row sm:space-x-4 justify-center md:flex-row '>
        <Link to='/menu'>Menu</Link>
        <Link to='/reservation'>Reservation</Link>
        <Link to='/aboutUs'>About us</Link>
        <Link to='/admin'>Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
