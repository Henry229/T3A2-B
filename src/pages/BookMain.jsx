import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getAllClient,
  updateClient,
  deleteClient,
  searchMobile,
} from '../api/fetch_res';
import NotConfirm from '../components/notConfirm./NotConfirm';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  const [mobile, setMobile] = useState('');
  let okClient = [];
  let notOkClient = [];

  const {
    state: { jwt },
  } = useLocation();
  const jwtValue = jwt.jwt;

  const handleUpdate = async (updated) => {
    // console.log('***yogida10: ', updated);
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

  const handleState = (updated) => {
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
  };

  const handleDelete = async (deleted) => {
    setClients(clients.filter((d) => d._id !== deleted._id));
    const deleteId = deleted._id;
    await deleteClient(jwtValue, deleteId);
  };

  const getConformedClients = (clients) => {
    return clients.filter((client) => client.isConfirmed === true);
  };
  okClient = getConformedClients(clients);
  const getConformingClients = (clients) => {
    return clients.filter((client) => client.isConfirmed === false);
  };
  notOkClient = getConformingClients(clients);

  const handleSearch = async (e) => {
    setMobile(() => e.target.value);
    await searchMobile(jwtValue, mobile).then((res) => console.log(res));
  };

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

  return (
    <>
      <section>
        <h2>Search mobile number</h2>
        <input type='text' value={mobile} onChange={handleSearch} />
      </section>
      <section>
        <h2>Booking List</h2>
        <h3>Need to confirm</h3>
        <ul>
          {notOkClient.map((client) => (
            <NotConfirm
              key={client._id}
              client={client}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              updateUsingState={handleState}
              updateInform={handleUpdate}
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
              onDelete={handleDelete}
              updateUsingState={handleState}
              updateInform={handleUpdate}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default BookMain;
