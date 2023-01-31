import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import {
  getAllClient,
  updateClient,
  deleteClient,
  searchMobile,
} from '../api/fetch_res';
import DoConfirm from '../components/DoConfirm/DoConfirm';
import { getConformedClients, getConformingClients } from '../util/getClients';
import SearchMobile from './SearchMobile';
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
  // let searchedClients = [];
  // let searched = [];

  const {
    state: { result },
  } = useLocation();
  let jwtValue = result.jwt;

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
    jwtValue = jwt;
    //call updateClient for fetch put
    const result = await updateClient(jwtValue, body, sendId);
    if (result.isError) {
      setErrMsg('fail to update client info!!');
    } else if (result.jwt) {
      setJwt(result.jwt);
    } else setErrMsg('failed updateClient()');
  };

  const handleState = (updated) => {
    setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
  };

  const handleDelete = async (deleted) => {
    setClients(clients.filter((d) => d._id !== deleted._id));
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
      if (! results?.isError) {
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
    e.target.value === 'All Reservations' 
    ? setClientsByDate([])
    : setClientsByDate(clients.filter(client => new Date(client.guest.date).getDate() === new Date(e.target.value).getDate()))
  }

  const dropDown = () => {
    const allDates = []
    clients.forEach(client => allDates.push(new Date(client.guest.date).toDateString()))
    const uniqueDates = allDates.filter((date, i) => allDates.indexOf(date) === i)
    return (
      uniqueDates.map((date, i ) => 
      <option key={i}>{new Date(date).toDateString()}</option>)
    )
  }

  return (
    <>
      <section>
        <article>
          <h2 className='text-3xl'>Search mobile number</h2>
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
        </article>
        <Link to='/admin'>Logout</Link>
      </section>
      {/* <div>{searched ? <SearchMobile className='w-full' /> : null}</div> */}
      <section>
        <h2>Booking List</h2>
        <select onChange={(e)=>getClientsBydate(e)}>
          {clients && dropDown()}
          <option>All Reservations</option>
        </select>
        <p ref={errRef} aria-live='assertive'>
          {errMsg}
        </p>
        <h3>Unconfirmed bookings</h3>
        <ul>
          {(clientsByDate.length 
            ? clientsByDate.filter(client=>!client.isConfirmed) 
            : notOkClient).map((client) => (
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
        <h3>Confirmed Bookings</h3>
        <ul>
            {(clientsByDate.length 
              ? clientsByDate.filter(client=>client.isConfirmed) 
              : okClient).map((client) => (
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
