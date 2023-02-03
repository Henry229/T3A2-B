import React, { useState } from 'react';
import Calendar from '../calendar/Calendar';
import validateInputs from '../../util/validations.js';

const UpdateModal = ({ client, updateUsingState, updateInform, onCancel }) => {
  const [updateDB, setUpdateDB] = useState('');
  const { firstName, lastName, mobile, date, guestNumber } = client.guest;
  const [getDate, setDate] = useState(new Date(date));
  const guest = client.guest;
  let updated = '';

  const handleChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();

    updated = {
      ...client,
      guest: { ...guest, [e.currentTarget.name]: e.currentTarget.value },
    };
    setUpdateDB(() => updated);
    updateUsingState(updated);
  };

  const updateDate = (dt) => {
    updated = { ...client, guest: { ...guest, date: dt } };
    setUpdateDB(() => updated);
    updateUsingState(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateDB) {
      return alert('Please type at least one field to update');
    }
    const fields = updateDB.guest;
    try {
      validateInputs(
        fields.date,
        fields.firstName,
        fields.lastName,
        fields.mobile
      );
    } catch (e) {
      return alert(e.message);
    }
    const capitalizeString = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    updateDB.guest.firstName = capitalizeString(fields.firstName);
    updateDB.guest.lastName = capitalizeString(fields.lastName);

    updateInform(updateDB);
  };

  return (
    <>
      <section className='fixed bottom-10 inset-x-0 px-4 pb-4 md:inset-0 md:flex md:items-center md:justify-center'>
        {/* <section className='fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'> */}
        <section
          className='fixed inset-0 transition-opacity'
          onClick={onCancel}
        >
          <article className='absolute inset-0 bg-gray-500 opacity-75'></article>
        </section>
        <div className=' bg-lime-100 rounded-lg overflow-hidden shadow-xl transform transition-all lg:max-w-md lg:w-full'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Update info.
                </h3>
              </div>
            </div>
            <div className='mt-5'>
              <div className='text-sm leading-5 text-gray-800 font-bold'>
                <form
                  className='grid gird-cols-1 sm:grid-cols-2 gap-2'
                  onSubmit={handleSubmit}
                >
                  <label htmlFor='date'>Booking Date</label>
                  <Calendar
                    date={getDate}
                    setDate={setDate}
                    updateDate={updateDate}
                    autocomplete='off'
                  />
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor='mobile'>Mobile No.</label>
                  <input
                    type='text'
                    name='mobile'
                    id='mobile'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={mobile}
                    onChange={handleChange}
                  />
                  {/* <label htmlFor='date'>Booking Date</label>
                  <input
                    type='date'
                    name='date'
                    id='date'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={stringDate}
                    onChange={handleChange}
                  />
                  <label htmlFor='time'>Booking Time</label>
                  <input
                    type='time'
                    name='time'
                    id='time'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={stringTime}
                    onChange={handleChange}
                  /> */}
                  <label htmlFor='number'>Number of People</label>
                  <select
                    name='guestNumber'
                    id='number'
                    className='py-1 pl-3 text-gray-800 bg-blue-100 text-sm rounded-md border-0 outline-0'
                    value={guestNumber}
                    onChange={handleChange}
                  >
                    <option value='6'>6</option>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                  </select>

                  <button className='inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='bg-slate-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
              <button
                type='button'
                className='inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                onClick={onCancel}
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* <button onClick={onCancel}> */}
    </>
  );
};

export default UpdateModal;
