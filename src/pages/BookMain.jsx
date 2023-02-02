import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { getAllClient, updateClient, deleteClient } from '../api/fetch_res';
import DoConfirm from '../components/DoConfirm/DoConfirm';
import { getConformedClients, getConformingClients } from '../util/getClients';
import { useJwt } from '../context/jwtContext';

const BookMain = () => {
  const [clients, setClients] = useState([]);
  const [clientsByDate, setClientsByDate] = useState([]);
  const { jwt, setJwt } = useJwt();
  const [mobile, setMobile] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const navigate = useNavigate();
  let okClient = [];
  let notOkClient = [];

  const {
    state: { result },
  } = useLocation();
  let jwtValue = result.jwt;

  const handleUpdate = async (updated, checkBox = false) => {
    clientsByDate.length
      ? setClientsByDate(
          clientsByDate.map((c) => (c._id === updated._id ? updated : c))
        )
      : setClients(clients.map((c) => (c._id === updated._id ? updated : c)));

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
    //call updateClient for fetch put
    const result = await updateClient(jwtValue, body, sendId);
    if (result?.error == 'No available table found') {
      alert('No available table found on the selected time');
    } else if (result?.jwt) {
      setJwt(result.jwt);
      !checkBox && alert('Update successful');
    } else {
      alert('Network error\nPlease try again later');
    }
  };

  const handleState = (updated) => {
    clientsByDate.length &&
      setClientsByDate(
        clientsByDate.map((c) => (c._id === updated._id ? updated : c))
      );
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
  };

  const handleDelete = async (deleted) => {
    setClients(clients.filter((d) => d._id !== deleted._id));
    clientsByDate.length &&
      setClientsByDate(clientsByDate.filter((d) => d._id !== deleted._id));

    const deleteId = deleted._id;
    jwtValue = jwt;
    // call deleteClient for fetch delete
    const result = await deleteClient(jwtValue, deleteId);
    if (result.isError) {
      console.log(result.errorData.message);
      setErrMsg('fail to delete client!!');
    } else if (result.jwt) {
      setJwt(result.jwt);
    } else setErrMsg('failed deleteClient()');
  };

  okClient = getConformedClients(clients);
  notOkClient = getConformingClients(clients);

  const handleForm = async (e) => {
    e.preventDefault();

    navigate(`/admin/search/${mobile}`, {
      state: { mobile },
    });
  };

  useEffect(() => {
    async function effect() {
      const results = await getAllClient(jwtValue);
      if (!results?.isError) {
        const clients = results.reservations;
        setJwt(results.jwt);
        setClients(clients);
      }
    }
    effect();
  }, []);

  useEffect(() => {
    if (clients.length) {
      okClient = getConformedClients(clients);
      notOkClient = getConformingClients(clients);
    }
  }, [clients]);

  const getClientsBydate = (e) => {
    e.preventDefault();
    e.target.value === 'All Reservations'
      ? setClientsByDate([])
      : setClientsByDate(
          clients.filter(
            (client) =>
              new Date(client.guest.date).getDate() ===
              new Date(e.target.value).getDate()
          )
        );
  };

  const dropDown = () => {
    const allDates = [];
    clients.forEach((client) =>
      allDates.push(new Date(client.guest.date).toDateString())
    );
    const uniqueDates = allDates.filter(
      (date, i) => allDates.indexOf(date) === i
    );
    return uniqueDates.map((date, i) => (
      <option key={i}>{new Date(date).toDateString()}</option>
    ));
  };

  return (
    <>
      <section className='w-full flex flex-col px-4 mt-4'>
        <article>
          <section className='flex'>
            <h1 className='basis-5/6 font-bold text-xl text-grey-50 mb-2'>
              Search mobile number
            </h1>
            <Link to='/'>
              <button className='basis-1/6 w-42 h-10 p-2 mt-6 rounded-lg bg-indigo-500 text-xl text-gray-50 '>
                Logout
              </button>
            </Link>
          </section>
          <form className='w-full flex justify-start ' onSubmit={handleForm}>
            <input
              type='search'
              name='q'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className='w-5/12 p-2 outline-none py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-l-lg'
              placeholder='e.g) 0411222333'
            />
            <button className='bg-zinc-400 px-4 py-2 rounded-r-lg'>
              <BsSearch />
            </button>
          </form>
        </article>
      </section>
      {!clients.length ? (
        <h2>No Reservation Found</h2>
      ) : (
        <section>
          <section className='w-full px-4 mt-4'>
            <h2 className='basis-5/6 font-bold text-xl text-grey-50 mb-2'>
              Booking List
            </h2>
            <select
              className='w-5/12 p-2 outline-none py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-lg'
              onChange={(e) => getClientsBydate(e)}
            >
              <option>All Reservations</option>
              {clients && dropDown()}
            </select>
            <p ref={errRef} aria-live='assertive'>
              {errMsg}
            </p>
            <h3>Unconfirmed bookings</h3>
            <ul className='list-none p-0 overflow-y-auto'>
              {(clientsByDate.length
                ? clientsByDate.filter((client) => !client.isConfirmed)
                : notOkClient
              ).map((client) => (
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
          <section className='w-full px-4 mt-4'>
            <h3>Confirmed Bookings</h3>
            <ul className='list-none p-0 overflow-y-auto'>
              {(clientsByDate.length
                ? clientsByDate.filter((client) => client.isConfirmed)
                : okClient
              ).map((client) => (
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
        </section>
      )}
    </>
  );
};

export default BookMain;
