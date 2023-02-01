import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConformedClients, getConformingClients } from '../util/getClients';
import { updateClient, deleteClient, searchMobile } from '../api/fetch_res';
import MobileSearchConfirm from '../components/MobileSearchConfirm/MobileSearchConfirm';
import { useJwt } from '../context/jwtContext';

const SearchMobile = () => {
  const {
    state: { mobile },
  } = useLocation();

  const [okClient, setOkClient] = useState([]);
  const { jwt, setJwt } = useJwt();
  const [notOkClient, setNotOkClient] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  let localOkClient = [];
  let localNotOkClient = [];

  let searchedClients = [];
  let searched = [];
  let jwtValue = jwt;
  console.log('===<<<', jwt, '/', jwtValue);

  const [mobileClients, setMobileClients] = useState(searchedClients);

  useEffect(() => {
    async function effect() {
      jwtValue = jwt;
      searched = await searchMobile(jwtValue, mobile);
      searched.reservations.map((reserv) => {
        searchedClients.push({
          guest: reserv.guest,
          isConfirmed: reserv.isConfirmed,
          tableNumber: reserv.table.tableNumber,
          _id: reserv._id,
          __v: 0,
        });
      });
      console.log('===<<< array in effect ', searchedClients);
      setMobileClients(searchedClients);
      setOkClient(() => getConformedClients(mobileClients));
      setNotOkClient(() => getConformingClients(mobileClients));
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
    jwtValue = jwt;
    const result = await updateClient(jwtValue, body, sendId);
    if (result.isError) {
      console.log(result.errorData.message);
      setErrMsg('fail to update mobile client info!!');
    } else if (result.jwt) {
      setJwt(result.jwt);
    } else setErrMsg('failed update mobile Client()');
  };

  const handleState = (updated) => {
    setMobileClients(
      mobileClients.map((c) => (c._id === updated._id ? updated : c))
    );
  };

  const handleDelete = async (deleted) => {
    setMobileClients(mobileClients.filter((d) => d._id !== deleted._id));
    const deleteId = deleted._id;
    jwtValue = jwt;
    // call deleteClient for fetch delete
    const result = await deleteClient(jwtValue, deleteId);
    if (result.isError) {
      console.log(result.errorData.message);
      setErrMsg('fail to delete mobile client!!');
    } else if (result.jwt) {
      setJwt(result.jwt);
    } else setErrMsg('failed deleteClient()');
  };

  return (
    <section className='w-full flex flex-col px-4 mt-4'>
      <h1 className='basis-5/6 font-bold text-3xl text-grey-50 mb-2'>
        Searched Mobile Info.
      </h1>
      <section>
        <h2 className='basis-5/6 font-bold text-2xl text-grey-50 mb-2'>
          Booking List
        </h2>
        <p ref={errRef} aria-live='assertive'>
          {errMsg}
        </p>
        <h3>Need to confirm</h3>
        <ul className='list-none p-0'>
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
        <ul className='list-none p-0'>
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
    </section>
  );
};

export default SearchMobile;
