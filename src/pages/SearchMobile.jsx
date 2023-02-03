import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getConformedClients, getConformingClients } from '../util/getClients';
import { updateClient, deleteClient, searchMobile } from '../api/fetch_res';
import MobileSearchConfirm from '../components/MobileSearchConfirm/MobileSearchConfirm';
import { useJwt } from '../context/jwtContext';
import Loader from '../components/loader/Loader';

const SearchMobile = () => {
  const {
    state: { mobile },
  } = useLocation();

  const [okClient, setOkClient] = useState([]);
  const { jwt, setJwt } = useJwt();
  const [notOkClient, setNotOkClient] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false)
  const errRef = useRef();
  let localOkClient = [];
  let localNotOkClient = [];

  let searchedClients = [];
  let searched = [];
  let jwtValue = jwt;

  const [mobileClients, setMobileClients] = useState(searchedClients);

  useEffect(() => {
    async function effect() {
      jwtValue = jwt;
      setLoading(true)
      searched = await searchMobile(jwtValue, mobile);
      setLoading(false)
      searched.reservations.map((reserv) => {
        searchedClients.push({
          guest: reserv.guest,
          isConfirmed: reserv.isConfirmed,
          tableNumber: reserv.table.tableNumber,
          _id: reserv._id,
          __v: 0,
        });
      });
      setMobileClients(searchedClients);
      setOkClient(() => getConformedClients(mobileClients));
      setNotOkClient(() => getConformingClients(mobileClients));
    }
    effect();
  }, []);

  useEffect(() => {
    setOkClient(() => getConformedClients(mobileClients));
    setNotOkClient(() => getConformingClients(mobileClients));
  }, [mobileClients]);

  const handleUpdate = async (updated) => {
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
    setLoading(true)
    const result = await updateClient(jwtValue, body, sendId);
    setLoading(false)
    if (result.isError) {
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
    setLoading(true)
    const result = await deleteClient(jwtValue, deleteId);
    setLoading(false)
    if (result.isError) {
      setErrMsg('fail to delete mobile client!!');
    } else if (result.jwt) {
      setJwt(result.jwt);
    } else setErrMsg('failed deleteClient()');
  };

  return (
    <section className='w-full flex flex-col px-4 mt-4'>
      {loading && <Loader />}
      <h1 className='basis-5/6 font-bold text-3xl text-grey-50 mb-2'>
        Searched Mobile Info.
      </h1>
      {!loading && !mobileClients.length
      ? <h2>No Reservation Found</h2>
      :
      <section>
        <h2 className='basis-5/6 font-bold text-2xl text-grey-50 mb-2'>
          Booking List
        </h2>
        <p ref={errRef} aria-live='assertive'>
          {errMsg}
        </p>
        <h3>Unconfirmed bookings</h3>
        <ul className='list-none p-0'>
          {notOkClient &&
            notOkClient.map((client) => (
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
      </section>}
      {!loading && !mobileClients.length
      ? null
      :
      <section>
        <h3>Confirmed Bookings</h3>
        <ul className='list-none p-0'>
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
      </section>}
    </section>
  );
};

export default SearchMobile;
