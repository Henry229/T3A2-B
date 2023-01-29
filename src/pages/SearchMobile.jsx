import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConformedClients, getConformingClients } from '../util/getClients';
import {
  getAllClient,
  updateClient,
  deleteClient,
  searchMobile,
} from '../api/fetch_res';
import MobileSearchConfirm from '../components/MobileSearchConfirm/MobileSearchConfirm';

const SearchMobile = () => {
  const {
    state: { mobile, jwtValue },
  } = useLocation();

  const [okClient, setOkClient] = useState([]);
  const [notOkClient, setNotOkClient] = useState([]);
  let localOkClient = [];
  let localNotOkClient = [];

  let searchedClients = [];
  let searched = [];

  const [mobileClients, setMobileClients] = useState(searchedClients);

  useEffect(() => {
    async function effect() {
      searched = await searchMobile(jwtValue, mobile);
      searched.reservations.map((reserv) => {
        searchedClients.push({
          guest: reserv.guest,
          isConfirmed: reserv.isConfirmed,
          _id: reserv._id,
          __v: 0,
        });
      });
      console.log('===<<< array in effect ', searchedClients);
      setMobileClients(searchedClients);
      setOkClient(() => getConformedClients(mobileClients));
      setNotOkClient(() => getConformingClients(mobileClients));

      // setMobileClients(searchedClients);
      // setOkClient(localOkClient);
      // setOkClient(getConformedClients(searchedClients));
      // console.log('>>>>okClient in effect: ', okClient);
      // setNotOkClient(localNotOkClient);
      // notOkClient(getConformingClients(searchedClients));
      // console.log('>>>>okClient in effect: ', notOkClient);
    }
    effect();
  }, []);

  useEffect(() => {
    console.log('>>>in effect', mobileClients);
    setOkClient(() => getConformedClients(mobileClients));
    console.log('### OKClient in effect', okClient);
    setNotOkClient(() => getConformingClients(mobileClients));
    // localNotOkClient = getConformingClients(mobileClients);
    console.log('### Not OKClient in effect', notOkClient);
    //   notOkClient.map((client) => console.log(client, '/', !!notOkClient));
  }, [mobileClients]);

  const handleUpdate = async (updated) => {
    console.log('***yogida10: ', updated);
    setMobileClients(
      mobileClients.map((c) => (c._id === updated._id ? updated : c))
    );
    const body = JSON.stringify({
      firstName: updated.guest.firstName,
      lastName: updated.guest.lastName,
      mobile: updated.guest.mobile,
      guestNumber: updated.guest.guestNumber,
      date: updated.guest.date,
      isConfirmed: updated.isConfirmed,
    });
    const sendId = updated._id;
    const resultUpdate = await updateClient(jwtValue, body, sendId);
  };

  const handleState = (updated) => {
    setMobileClients(
      mobileClients.map((c) => (c._id === updated._id ? updated : c))
    );
  };

  const handleDelete = async (deleted) => {
    setMobileClients(mobileClients.filter((d) => d._id !== deleted._id));
    const deleteId = deleted._id;
    await deleteClient(jwtValue, deleteId);
  };

  return (
    <>
      <h2>Searched Mobile Info.</h2>
      <section>
        <h2>Booking List</h2>
        <h3>Need to confirm</h3>
        <ul>
          {console.log('<<<<localNotOkClient in UL', localNotOkClient)}
          {notOkClient &&
            notOkClient.map((client) => (
              // <p key={client._id}>{client.guest.firstName}</p>

              <MobileSearchConfirm
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
          {console.log('<<<<localOkClient in UL', localOkClient)}
          {okClient &&
            okClient.map((client) => (
              <MobileSearchConfirm
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

export default SearchMobile;
