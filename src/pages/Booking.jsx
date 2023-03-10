import React, { useRef } from 'react';
import { useState } from 'react';
import { bookingClient } from '../api/fetch_res';
import Calendar from '../components/calendar/Calendar';
import validateInputs from '../util/validations.js';
import Loader from '../components/loader/Loader';

const Booking = () => {
  const formRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const guestNumberRef = useRef();
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // handling submit when clicking button in form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      validateInputs(
        date,
        firstNameRef.current.value,
        lastNameRef.current.value,
        mobileRef.current.value
      );
    } catch (e) {
      return alert(e.message);
    }

    const capitalizeString = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const body = JSON.stringify({
      firstName: capitalizeString(firstNameRef.current.value),
      lastName: capitalizeString(lastNameRef.current.value),
      mobile: mobileRef.current.value,
      date: date,
      guestNumber: guestNumberRef.current.value,
    });
    setIsLoading(true);
    const res = await bookingClient(body);
    setIsLoading(false);
    if (res.table) {
      alert(
        `Your reservation has been made on\n${new Date(
          res.guest.date
        ).toLocaleString()} for ${res.guest.guestNumber} people`
      );
      formRef.current.reset();
    } else {
      if (res.error == 'Same guest found!') {
        return alert('Your booking already has been made.');
      }
      if (res.error == 'No available table found') {
        return alert('Sorry, we all booked out on the selected time.');
      }
    }
    formRef.current.reset();
  };

  return (
    <section className='flex flex-col px-8 mt-4'>
      {isLoading && <Loader />}
      <h1 className='font-bold text-xl text-grey-50 mb-2'>
        Booking for Customer
      </h1>
      <form
        className='grid gird-cols-1 sm:grid-cols-2 gap-4'
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <article className='flex flex-col'>
          <label htmlFor='firstName' className='mr-4'>
            First Name
          </label>
          <input
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-blue-100 rounded-md border-0 outline-0'
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
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-blue-100 rounded-md border-0 outline-0'
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
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-blue-100 rounded-md border-0 outline-0'
            ref={mobileRef}
            type='text'
            name='mobile'
            id='mobile'
            placeholder='Mobile 0401333777'
          />
        </article>
        <Calendar date={date} setDate={setDate} />
        <article className='flex flex-col'>
          <label htmlFor='number' className='mr-4'>
            Number of People
          </label>
          <select
            className='my-2 py-1 pl-3 text-gray-800 text-lg bg-blue-100 rounded-md border-0 outline-0'
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
