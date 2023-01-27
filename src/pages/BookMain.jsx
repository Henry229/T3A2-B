import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import {
  getAllClient,
  updateClient,
  deleteClient,
  searchMobile,
} from '../api/fetch_res';
import DoConfirm from '../components/DoConfirm./DoConfirm';
import { getConformedClients, getConformingClients } from '../util/getClients';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  const [searchedClients, setSearchedClients] = useState([]);
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
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
    //REMOVED AWAIT
    updateClient(jwtValue, body, sendId);
  };

  const handleState = (updated) => {
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
  };

  const handleDelete = async (deleted) => {
    setClients(clients.filter((d) => d._id !== deleted._id));
    const deleteId = deleted._id;
    await deleteClient(jwtValue, deleteId);
  };

  okClient = getConformedClients(clients);
  notOkClient = getConformingClients(clients);

  const handleForm = async (e) => {
    e.preventDefault();
    await searchMobile(jwtValue, mobile)
      .then((res) => console.log('<<<===', res[0].guest))
      .then((data) =>
        data.map((client, index) => console.log('###', client[index].guest))
      );
    // .then((data) => data.map((client) => setSearchedClients(client)));
    navigate(`/admin/search/${mobile}`, {
      state: { searchedClients },
      // state: { searchedClients, handleUpdate, handleDelete, handleState },
    });
  };
  // state: { searchedClients, handleUpdate, handleDelete, handleState },
  // await searchMobile(jwtValue, mobile).then((searchedClients) =>
  //   navigate(`/admin/search/${mobile}`, {
  //     state: { searchedClients, handleUpdate, handleDelete, handleState },
  //   })
  // );
  // };

  useEffect(() => {
    async function effect() {
      const clients = await getAllClient(jwtValue);
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
        <form action='' onSubmit={handleForm}>
          <input
            type='search'
            name='q'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button>
            <BsSearch />
          </button>
        </form>
      </section>
      <section>
        <h2>Booking List</h2>
        <h3>Need to confirm</h3>
        <ul>
          {notOkClient.map((client) => (
            <DoConfirm
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
            <DoConfirm
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
