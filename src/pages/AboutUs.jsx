import React from 'react';
import './aboutUs.css'
import Map from '../components/map/map';

const AboutUs = () => {

  return (
    <main className='aboutUs'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" />
      <article className='nameCard'>
        <p className='nameCardP'><span className="material-symbols-outlined">restaurant</span>The Gangnam Style BBQ</p>
        <p className='nameCardP'><span className="material-symbols-outlined">pin_drop</span>00 Abc Ave, Abc, Syd</p>
        <p className='nameCardP'><span className="material-symbols-outlined">phone_in_talk</span>012 345 678</p>
        <p className='nameCardP' id='lastNameP'><span className="material-symbols-outlined">mail</span>mashita@email.com</p>
      </article>
      <article id='mapContainer'>
        <Map />
      </article>
    </main>
  );
};

export default AboutUs;
