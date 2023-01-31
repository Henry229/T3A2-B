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
  const [date, setDate] = useState(null);
  // const [endDate, setEndDate] = useState(addMinutes(new Date(), 30));

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const letters = /^[A-Za-z]+$/
    console.log(date)

    if (date.toLocaleString().slice(12) === '00:00:00') {
      alert('Please select a valid time from the calendar')
    }
  
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
<<<<<<< HEAD
      date: date,
      guestNumber: guestNumberRef.current.value,
    });
    console.log(body);
=======
      date: `${dateRef.current.value}T${timeRef.current.value}`,
      // time: timeRef.current.value || '',
      guestNumber: guestNumberRef.current.value,
    });
    // const convertDay = `${bookingPerson.date}T${bookingPerson.time}Z`;
    // bookingPerson.date = convertDay.toLocaleString();
    // console.log('####', bookingPerson.date, '/', convertDay);
    // delete bookingPerson.time;
>>>>>>> main
    bookingClient(body);
    
    formRef.current.reset();
    };

  return (
<<<<<<< HEAD
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
        placeholderText='Select date'
        selected={date}
        onChange={(date) => setDate(date)} 
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
=======
    <section className='w-full flex flex-col px-4 mt-4'>
      <h1 className='font-bold text-xl text-grey-50 mb-2'>
        Booking for Customer
      </h1>
      <form
        className='grid gird-cols-1 sm:grid-cols-2 gap-4'
        // className='w-full flex flex-col'
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <article className='flex flex-col'>
          <label htmlFor='firstName' className='mr-4'>
            First Name
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={firstNameRef}
            type='text'
            name='firstName'
            id='firstName'
            placeholder='First Name'
          />
        </article>
        <article className='flex flex-col'>
          <label htmlFor='lastName' className='mr-4'>
            Last Name
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={lastNameRef}
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Last Name'
          />
        </article>
        <article className='flex flex-col'>
          <label htmlFor='mobile' className='mr-4'>
            Mobile No.
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={mobileRef}
            type='text'
            name='mobile'
            id='mobile'
            placeholder='Mobile 0401333777'
          />
        </article>
        <article className='flex flex-col'>
          <label htmlFor='date' className='mr-4'>
            Booking Date
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={dateRef}
            type='date'
            name='date'
            id='date'
            placeholder=''
          />
        </article>
        <article className='flex flex-col'>
          <label htmlFor='time' className='mr-4'>
            Booking Time
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={timeRef}
            type='time'
            name='time'
            id='time'
            placeholder=''
          />
        </article>
        <article className='flex flex-col'>
          <label htmlFor='number' className='mr-4'>
            Number of People
          </label>
          <select
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-amber-100 rounded-md border-0 outline-0'
            ref={guestNumberRef}
            name='guestNumber'
            id='number'
          >
            <option value='6'>6</option>
            <option value='5'>5</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1</option>
          </select>
        </article>
        <div></div>
        <div className='flex justify-end '>
          <button
            className='w-56 h-12 p-3 mt-2 rounded-lg bg-indigo-500 text-xl'
            onClick={handleSubmit}
          >
            Book
          </button>
        </div>
>>>>>>> main
      </form>
    </section>
  );
};

export default Booking;
