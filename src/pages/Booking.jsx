import React, { useRef } from 'react';
import { useState } from 'react';
import { bookingClient } from '../api/fetch_res';

const Booking = () => {
  const formRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const guestNumberRef = useRef();

  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      firstNameRef.current.value === '' ||
      lastNameRef.current.value === '' ||
      mobileRef.current.value === '' ||
      dateRef.current.value === '' ||
      guestNumberRef.current.value === ''
    )
      return;

    const body = JSON.stringify({
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      mobile: mobileRef.current.value,
      date: `${dateRef.current.value}T${timeRef.current.value}`,
      // time: timeRef.current.value || '',
      guestNumber: guestNumberRef.current.value,
    });
    // const convertDay = `${bookingPerson.date}T${bookingPerson.time}Z`;
    // bookingPerson.date = convertDay.toLocaleString();
    // console.log('####', bookingPerson.date, '/', convertDay);
    // delete bookingPerson.time;
    bookingClient(body);
    
    formRef.current.reset();
  };

  return (
    <section>
      <h2>Booking for Customer</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input
          ref={firstNameRef}
          type='text'
          name='firstName'
          id='firstName'
          placeholder='First Name'
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          ref={lastNameRef}
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Last Name'
        />
        <label htmlFor='mobile'>Mobile No.</label>
        <input
          ref={mobileRef}
          type='text'
          name='mobile'
          id='mobile'
          placeholder='Mobile 0401333777'
        />
        <label htmlFor='date'>Booking Date</label>
        <input ref={dateRef} type='date' name='date' id='date' placeholder='' />
        <label htmlFor='time'>Booking Time</label>
        <input ref={timeRef} type='time' name='time' id='time' placeholder='' />
        <label htmlFor='number'>Number of People</label>
        <select ref={guestNumberRef} name='guestNumber' id='number'>
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
        <button>Book</button>
      </form>
    </section>
  );
};

export default Booking;
