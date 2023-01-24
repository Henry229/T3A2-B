import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <section id='footerIcons'>
        <a href="#" class="fa fa-instagram fa-2x"></a>
        <a href="#" class="fa fa-facebook fa-2x"></a>
        <button class="material-symbols-outlined">mail</button>
        <button class="material-symbols-outlined">call</button>
      </section>
      <section id='footerText'>
          <p>mashita@gmail.com</p>
          <p>012-345-678</p>
      </section>
    </footer>
  );
};

export default Footer;
