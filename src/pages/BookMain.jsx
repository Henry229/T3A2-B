import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllClient, updateClient } from '../api/fetch_res';
import NotConfirm from '../components/notConfirm./NotConfirm';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  let okClient = [];
  let notOkClient = [];

  const {
    state: { jwt },
  } = useLocation();
  const jwtValue = jwt.jwt;

  const handleUpdate = async (updated) => {
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
    const body = JSON.stringify({
      firstName: updated.guest.firstName,
      lastName: updated.guest.lastName,
      mobile: updated.guest.mobile,
      guestNumber: updated.guest.guestNumber,
      date: updated.guest.date,
      isConfirmed: updated.isConfirmed,
    });
    const sendId = updated._id;
    await updateClient(jwtValue, body, sendId);
  };

  const handleDelete = async (deleted) => {
    setClients(clients.filter((d) => d._id !== deleted._id));
    await deleteClient();
  };

  const getConformedClients = (clients) => {
    return clients.filter((client) => client.isConfirmed === true);
  };
  okClient = getConformedClients(clients);
  const getConformingClients = (clients) => {
    return clients.filter((client) => client.isConfirmed === false);
  };
  notOkClient = getConformingClients(clients);

  useEffect(() => {
    async function effect() {
      const clients = await getAllClient(jwtValue);
      console.log(clients);
      setClients(clients);
    }
    effect();
  }, []);

  useEffect(() => {
    okClient = getConformedClients(clients);
    notOkClient = getConformingClients(clients);
  }, [clients]);

  console.log('>>>', okClient);
  console.log('<<<<', notOkClient);
  return (
    <>
      <section>
        <h1>Booking List</h1>
        <h3>Need to confirm</h3>
        <ul>
          {notOkClient.map((client) => (
            <NotConfirm
              key={client._id}
              client={client}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </section>
      <section>
        <h3>Completed Booking</h3>
        <ul>
          {okClient.map((client) => (
            <NotConfirm
              key={client._id}
              client={client}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default BookMain;
