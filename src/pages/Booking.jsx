import React, { useRef } from 'react';
import { useState } from 'react';
import { bookingClient } from '../api/fetch_res';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { addDays, subDays, setHours, setMinutes, getHours, addMinutes } from 'date-fns';
import './booking.css'


const Booking = () => {
  const formRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const dateRef = useRef();
  // const timeRef = useRef();
  const guestNumberRef = useRef();

  const [data, setData] = useState([]);
  const [date, setDate] = useState(addMinutes(new Date(), 30));
  // const [endDate, setEndDate] = useState(addMinutes(new Date(), 30));

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = /^[A-Za-z]+$/
    // if (
    //   firstNameRef.current.value === '' ||
    //   lastNameRef.current.value === '' ||
    //   mobileRef.current.value === '' ||
    //   date <= new Date() ||
    //   guestNumberRef.current.value === ''
    // )
    //   return;
  
    if (
      !firstNameRef.current.value.match(letters) || 
      !lastNameRef.current.value.match(letters)
      ) {
      return alert('Please type valid name without space.')
    }

    if (
      mobileRef.current.value.length != 10 || 
      Number(mobileRef.current.value) === NaN ||
      !mobileRef.current.value.startsWith('04')
      ) {
      return alert('Please type a valid mobile number')
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
        <DatePicker name='date' id='date' 
        selected={date} onChange={(date) => setDate(date)} 
        includeDateIntervals={[
        { start: subDays(new Date(), 1), end: addDays(new Date(), 30) },
        ]}
        format='yyyy-MM-dd'
        timeFormat="p"
        dateFormat="Pp"
        showTimeSelect
        filterTime={filterPassedTime}
        disabledKeyboardNavigation
        minTime={setHours(setMinutes(new Date(), 0), 11)}
        maxTime={setHours(setMinutes(new Date(), 30), 20)}
        excludeTimes={[
        setHours(setMinutes(new Date(), 30), 14),
        setHours(setMinutes(new Date(), 0), 15),
        setHours(setMinutes(new Date(), 30), 15),
        setHours(setMinutes(new Date(), 0), 16),
        setHours(setMinutes(new Date(), 30), 16)
      ]}
        />
        <label htmlFor='number'>Number of People</label>
        <select ref={guestNumberRef} name='guestNumber' id='number'>
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
