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
      date: `${dateRef.current.value}T${timeRef.current.value}Z`.toLocaleString(),
      // time: timeRef.current.value || '',
      guestNumber: guestNumberRef.current.value,
    });
    // const convertDay = `${bookingPerson.date}T${bookingPerson.time}Z`;
    // bookingPerson.date = convertDay.toLocaleString();
    // console.log('####', bookingPerson.date, '/', convertDay);
    // delete bookingPerson.time;
    console.log('=== yogida1:', body);
    bookingClient(body);
    formRef.current.reset();
  };

  return (
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
      </form>
    </section>
  );
};

export default Booking;
