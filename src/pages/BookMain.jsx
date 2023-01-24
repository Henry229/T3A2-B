import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Restaurant from '../api/restaurant';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  const {
    state: { jwt },
  } = useLocation();

  const restaurant = new Restaurant();

  useEffect(() => {
    const allClient = restaurant.getAllClient(jwt);
    setClients(() => allClient);
  }, []);

  return (
    <section>
      <h1>Booking List</h1>
      <h1>Need to confirm</h1>
      <ul></ul>
    </section>
  );
};

export default BookMain;
