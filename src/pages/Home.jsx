import React, { useState } from 'react';
import bbq1 from '../assets/bbq1.jpg';
import bbq4 from '../assets/bbq4.jpg';
import foods from '../assets/foods.jpg';
import meat4 from '../assets/meat4.jpg';
import meat1 from '../assets/meat1.jpg';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const images = [bbq1, meat1, bbq4, foods, meat4];
  const [mainImage, setMainImage] = useState(bbq1);

  const changeMainImg = (index) => {
    setMainImage(images[index]);
  };

  const renderImages = () => {
    return images.map((image, index) => {
      return (
        <img
          onClick={() => changeMainImg(index)}
          className='imagesInSlide'
          key={index}
          src={image}
          alt='Photo of meat'
        />
      );
    });
  };

  return (
    <main className='home'>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,200'
      />
      <article className='homeMain'>
        <h1>Taste Korea In Sydney</h1>
        <section id='homeMainImg'>
          <img src={mainImage} alt='Korean BBQ Photo' />
        </section>
      </article>
      <article className='homeSub'>
        <section id='imgSlideContainer'>{renderImages()}</section>
        <section className='homeSubText'>
          <h1>We are Gangnam Style BBQ</h1>
          <section id='homeTextBox'>
            <p>Where traditional flavors and modern twists come together. </p>
            <section id='homeHiddenText'>
              <p>
                Come and join us for a delicious and authentic Korean BBQ
                experience.
              </p>
            </section>
          </section>
        </section>
      </article>
      <article className='homeNavContainer'>
        <Link className='homeNavIcons' to='/menu'>
          <span className='material-symbols-outlined'>restaurant_menu</span>
          <p>Menu</p>
        </Link>
        <Link className='homeNavIcons' to='/reservation'>
          <span className='material-symbols-outlined'>book</span>
          <p>Reservation</p>
        </Link>
        <a
          className='homeNavIcons'
          href='https://www.google.com/maps/place/Sydney+Opera+House/@-33.8567844,151.213108,17z/data=!3m2!4b1!5s0x6b12ae67d234a27f:0xd6d4e9380ca1e32f!4m6!3m5!1s0x6b12ae665e892fdd:0x3133f8d75a1ac251!8m2!3d-33.8567844!4d151.2152967!16zL20vMDZfbm0'
        >
          <span className='material-symbols-outlined'>location_on</span>
          <p>Location</p>
        </a>
      </article>
    </main>
  );
};

export default Home;
