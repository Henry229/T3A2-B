import React, { useState } from 'react';
import './footer.css'


const Footer = () => {
  const [popupBox, setPopupBox] = useState('')
  const [targetContent, setTargetContent] = useState('')

  const displayPopupBox = (e) => {
    setPopupBox(document.getElementById("footerPopup"))
    setTargetContent(e.target.innerHTML)
    //Not calling popupBox state her because it won't be updated yet
    document.getElementById("footerPopup").style.display = "block"
  }

  const closePopupBox = () => {
    popupBox.style.display = "none"
  }

  window.onclick = (e) => {
    if (e.target == popupBox) {
      popupBox.style.display = "none"
    }
  }
  return (
    <footer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <section id='footerIcons'>
        <button className="material-symbols-outlined" onClick={(displayPopupBox)}>mail</button>
        <button className="material-symbols-outlined" onClick={displayPopupBox}>call</button>
        <a href="https://www.instagram.com/" className="fa fa-instagram fa-2x"></a>
        <a href="https://www.facebook.com" className="fa fa-facebook fa-2x"></a>
      </section>
      <section id="footerPopup">
        <article id="footerPopupContents">
          <section className='footerPopupHeader'>
            <div id='footerPopupClose' onClick={closePopupBox}>&times;</div>
            {targetContent == 'mail' ? <h2>Email Us</h2> : <h2>Call Us</h2>}
          </section>
          <section className='footerPopupBody'>
          {targetContent == 'mail' ? <p>mashita@email.com</p> : <p>012 345 678</p>}
          </section>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
