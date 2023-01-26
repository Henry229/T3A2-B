import React, {useState} from 'react'
import bbq1 from '../assets/bbq1.jpg'
import bbq4 from '../assets/bbq4.jpg'
import foods from '../assets/foods.jpg'
import meat4 from '../assets/meat4.jpg'
import meat1 from '../assets/meat1.jpg'
import './home.css'


const Home = () => {
  const images = [bbq1, meat1, bbq4, foods, meat4]
  const [mainImage, setMainImage] = useState(bbq1)

  const changeMainImg = (index) => {
    setMainImage(images[index])
  }

  const renderImages = () => {
    return images.map((image, index) => {
      return <img onClick={() => changeMainImg(index)} className='imagesInSlide' key={index} src={image} alt='Photo of meat' />
    })
  }
  
  return (
    <main className='home'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,200" />
      <article className='homeMain'>
        <h1>Taste Korea In Sydney</h1>
          <section id='homeMainImg'>
            <img src={mainImage} alt="Korean BBQ Photo" />
        </section>
      </article>
      <article className='homeSub'>
        <section id='imgSlideContainer'>
          {renderImages()}
        </section>
        <section className='homeSubText'>
          <h1>We are Gangnam Style BBQ</h1>
          <section id='homeTextBox'>
            <p>Where traditional flavors and modern twists come together. </p>
            <section id='homeHiddenText'>
             <p>Come and join us for a delicious and authentic Korean BBQ experience.</p>
            </section>
          </section>
        </section>
      </article>
      <article className='homeNavContainer'>
        <section className='homeNavIcons'>
          <span class="material-symbols-outlined">restaurant_menu</span>
          <p>Menu</p>
        </section>
        <section className='homeNavIcons'>
          <span class="material-symbols-outlined">book</span>
          <p>Reservation</p>
        </section>
        <section className='homeNavIcons'>
          <span class="material-symbols-outlined">location_on</span>
          <p>Location</p>
        </section>
      </article>
    </main>
  )
}

export default Home