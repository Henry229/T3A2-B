import React, { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

const UpdateModal = ({ client, updateUsingState, updateInform, onCancel }) => {
  const [updateDB, setUpdateDB] = useState('');
  const { firstName, lastName, mobile, date, guestNumber } = client.guest;
  const guest = client.guest;
  let updated = '';

  const stringDate = date.slice(0, 10);
  const stringTime = date.slice(11, 16);
  // date: stringDate.toLocaleString();

  const handleChange = async (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();
    if (e.currentTarget.name === 'date') {
      const time = `${stringTime}:00.000`;
      const day = `${e.currentTarget.value}T${time}Z`;
      updated = { ...client, guest: { ...guest, date: day } };
    } else if (e.currentTarget.name === 'time') {
      const day = `${stringDate}T${e.currentTarget.value}:00.000Z`;
      updated = { ...client, guest: { ...guest, date: day } };
    } else {
      updated = {
        ...client,
        guest: { ...guest, [e.currentTarget.name]: e.currentTarget.value },
      };
    }
    setUpdateDB(() => updated);
    updateUsingState(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInform(updateDB);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={firstName}
          onChange={handleChange}
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={lastName}
          onChange={handleChange}
        />
        <label htmlFor='mobile'>Mobile No.</label>
        <input
          type='text'
          name='mobile'
          id='mobile'
          value={mobile}
          onChange={handleChange}
        />
        <label htmlFor='date'>Booking Date</label>
        <input
          type='date'
          name='date'
          id='date'
          value={stringDate}
          onChange={handleChange}
        />
        <label htmlFor='time'>Booking Time</label>
        <input
          type='time'
          name='time'
          id='time'
          value={stringTime}
          onChange={handleChange}
        />
        <label htmlFor='number'>Number of People</label>
        <select
          name='guestNumber'
          id='number'
          value={guestNumber}
          onChange={handleChange}
        >
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
        <button>Update</button>
      </form>
      {/* <button onClick={onCancel}> */}
      <button onClick={onCancel}>
        <FaRegWindowClose />
      </button>
    </>
  );
};

export default UpdateModal;
