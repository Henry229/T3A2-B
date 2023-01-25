import React, {useState} from 'react'
import bbq1 from '../assets/bbq1.jpg'
import bbq2 from '../assets/bbq2.jpg'
import bbq4 from '../assets/bbq4.jpg'
import foods from '../assets/foods.jpg'
import meat4 from '../assets/meat4.jpg'
import './home.css'


const Home = () => {
  const images = [bbq1, bbq2, bbq4, foods, meat4]
  const [mainImage, setMainImage] = useState(bbq2)

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
      <h1>Taste Korea In Sydney</h1>
        <section id='homeMainImg'>
          <img src={mainImage} alt="Korean BBQ Photo" />
        </section>
        <section id='imgSlideContainer'>
          {renderImages()}
        </section>
        <h1>We are Gangnam Style BBQ</h1>
        <section id='homeTextBox'><p>Where traditional flavors and modern twists come together. </p></section>
    </main>
  )
}

export default Home