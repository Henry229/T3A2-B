import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoConfirm from '../components/DoConfirm/DoConfirm';
import { getConformedClients, getConformingClients } from '../util/getClients';

const SearchMobile = () => {
  const {
    state: { searchedClients },
  } = useLocation();

  console.log('<<<>>>>', searchedClients);

  let okClient = [];
  let notOkClient = [];
  const [mobileClients, setMobileClients] = useState([]);

  useEffect(() => {
    setMobileClients(searchedClients);
    okClient = getConformedClients(mobileClients);
    notOkClient = getConformingClients(mobileClients);
  }, [mobileClients]);

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

  return (
    <div>
      <h2>Searched Mobile Info.</h2>
      <section>
        <h2>Booking List</h2>
        <h3>Need to confirm</h3>
        <ul>
          {notOkClient.map((client) => (
            <DoConfirm
              key={client._id}
              client={mobileClients}
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
              client={mobileClients}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              updateUsingState={handleState}
              updateInform={handleUpdate}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SearchMobile;
