import React from 'react';
import './menuList.css'
import beer from '../assets/beer.jpg'
import bulgogi from '../assets/bulgogi.jpg'
import coke from '../assets/coke.jpg'
import coldNoodle from '../assets/coldNoodle.jpg'
import fanta from '../assets/fanta.jpg'
import kimchi from '../assets/kimchi.jpg'
import loin from '../assets/loin.jpg'
import miso from '../assets/miso.jpg'
import porkBelly from '../assets/porkBelly.jpg'
import ramyeon from '../assets/ramyeon.jpg'
import soju from '../assets/soju.jpg'
import steamEgg from '../assets/steamEgg.avif'
import wagyu from '../assets/wagyu.jpg'

const MenuList = () => {

  const mainDishes = [wagyu, loin, porkBelly, bulgogi]
  const mainDetails = ['Wagyu Beef$42', 'Beef Loin$35', 'Pork Belly$25', 'Bulgogi$25']

  const sideDishes = [coldNoodle, kimchi, miso, ramyeon, steamEgg]
  const sideDetails = ['Cold Noodle$17', 'Kimchi$5', 'Miso Soup$7', 'Ramyeon$10', 'Steamed Egg$7']

  const drinks = [coke, fanta, beer, soju]
  const drinkDetails = ['Coke$5', 'Fanta$5', 'Beer$18', 'Soju$18']

  const getMenuDetails = (menus, key) => {
    switch (menus) {
      case mainDishes:
        return {
          name: mainDetails[key].slice(0, mainDetails[key].indexOf('$')),
          price: mainDetails[key].slice(mainDetails[key].indexOf('$'))
        }

      case sideDishes:
        return {
          name: sideDetails[key].slice(0, sideDetails[key].indexOf('$')),
          price: sideDetails[key].slice(sideDetails[key].indexOf('$'))
        }

      case drinks:
        return {
          name: drinkDetails[key].slice(0, drinkDetails[key].indexOf('$')),
          price: sideDetails[key].slice(sideDetails[key].indexOf('$'))
      }
    }
  }
  
  const renderMenus = (menus) => {
    return menus.map((menu, key) => {
      return (
        <article className='menus' key={key}>
          <img className='menuFoodImg' src={menu} alt={`Photo of ${getMenuDetails(menus, key).name}`}/>
          <p>{getMenuDetails(menus, key).name}</p>
          <p>{getMenuDetails(menus, key).price}</p>
        </article>
      )
    })
  }

  return (
    <menu>
      <section className='menuCategory'>
        <h1>Main</h1>
        {renderMenus(mainDishes)}
      </section>
      <section className='menuCategory'>
        <h1>Side</h1>
        {renderMenus(sideDishes)}
      </section>
      <section id= 'lastMenu' className='menuCategory'>
        <h1>Drink</h1>
        {renderMenus(drinks)}
      </section>
    </menu>
  );
};

export default MenuList;
