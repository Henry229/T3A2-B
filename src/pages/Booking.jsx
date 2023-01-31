import React, { useRef } from 'react';
import { useState } from 'react';
import { bookingClient } from '../api/fetch_res';
import './booking.css'
import Calendar from '../components/calendar/Calendar';
import validateInputs from '../util/validations.js';


const Booking = () => {
  const formRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const guestNumberRef = useRef();
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      validateInputs(date, firstNameRef.current.value, lastNameRef.current.value, mobileRef.current.value)
    }catch(e) {
      return alert(e.message)
    }

    const capitalizeString = (str) => {
      return str.charAt(0).toUpperCase()+str.slice(1)
    }

    const body = JSON.stringify({
      firstName: capitalizeString(firstNameRef.current.value),
      lastName: capitalizeString(lastNameRef.current.value),
      mobile: mobileRef.current.value,
      date: date,
      guestNumber: guestNumberRef.current.value,
    });
    bookingClient(body);
    formRef.current.reset();
    };

  return (
    <section>
      <h2>Booking for Customer</h2>
      <form ref={formRef} onSubmit={handleSubmit} autoComplete="off" >
        <label htmlFor='firstName' >First Name</label>
        <input
          ref={firstNameRef}
          type='text'
          name='firstName'
          id='firstName'
          placeholder='First Name'
          className='bookingForm'
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          className='bookingForm'
          ref={lastNameRef}
          type='text'
          name='lastName'
          id='lastName'
          placeholder='Last Name'
        />
        <label htmlFor='mobile'>Mobile No.</label>
        <input
          className='bookingForm'
          ref={mobileRef}
          type='text'
          name='mobile'
          id='mobile'
          placeholder='Mobile 0401333777'
        />
        <label htmlFor='date'>Booking Date</label>
        <Calendar date={date} setDate={setDate}/>
        <label htmlFor='number'>Number of People</label>
        <select ref={guestNumberRef} name='guestNumber' id='number' className='bookingForm'>
          <option value='6'>6</option>
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