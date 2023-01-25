import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllClient, updateClient } from '../api/fetch_res';
import NotConfirm from '../components/notConfirm./NotConfirm';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  const {
    state: { jwt },
  } = useLocation();

  const handleUpdate = (updated) => {
    console.log('###', updated);
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
    const body = {
      firstName: updated.firstName,
      lastName: updated.lastName,
      mobile: updated.mobile,
      guestNumber: updated.guestNumber,
      date: updated.date,
      isConfirmed: updated.isConfirmed,
    };
    const sendId = updated._id;
    console.log('!!!', jwt, '/', body, '@@ID:', sendId);
    updateClient(jwt, body, sendId);
    // const updatedInfo = updateClient(jwt, body, sendId);
  };

  useEffect(() => {
    async function effect() {
      console.log('@@@', jwt.jwt);
      const jwtValue = jwt.jwt;
      const clients = await getAllClient(jwtValue);
      console.log(clients);
      setClients(clients);
    }
    effect();
  }, []);

  return (
    <section>
      <h1>Booking List</h1>
      <h3>Need to confirm</h3>
      <ul>
        {clients.map((client) => (
          <NotConfirm
            key={client._id}
            client={client}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
};

export default BookMain;
