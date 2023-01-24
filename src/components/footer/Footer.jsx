import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <section id='icons'>
        <a href="#" class="fa fa-instagram fa-2x"></a>
        <a href="#" class="fa fa-facebook fa-2x"></a>
        <a href="#" class="fa fa-twitter fa-2x"></a>
        <a href="#" class="fa fa-whatsapp fa-2x"></a>
      </section>
      <section id='email'>
        mashita@gmail.com
      </section>
      <section id='ph'>
        012-345-678
      </section>
    </footer>
  );
};

export default Footer;
