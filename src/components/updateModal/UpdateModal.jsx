import React, { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import Calendar from '../calendar/Calendar';
import validateInputs from '../../util/validations.js';


const UpdateModal = ({ client, updateUsingState, updateInform, onCancel }) => {
  const [updateDB, setUpdateDB] = useState('');
  const { firstName, lastName, mobile, date, guestNumber } = client.guest;
  const [getDate, setDate] = useState(new Date(date))
  const guest = client.guest;
  let updated = '';

  const stringDate = date.slice(0, 10);
  const stringTime = date.slice(11, 16);
  // date: stringDate.toLocaleString();

  const handleChange = (e) => {
    if (e.currentTarget == null) {
      return;
    }
    e.preventDefault();

    updated = {
      ...client,
      guest: { ...guest, [e.currentTarget.name]: e.currentTarget.value },
    };
    console.log(updated);
    setUpdateDB(() => updated);
    updateUsingState(updated);
  };

  const updateDate = (dt) => {
    updated = { ...client, guest: { ...guest, date: dt } }
    setUpdateDB(() => updated);
    updateUsingState(updated);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updated)
    if (!updated) {
      return alert("Please type at least one field to update")
    }

    updateInform(updateDB);
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off" >
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
        <Calendar date={getDate} setDate={setDate} updateDate={updateDate}/>
        <label htmlFor='number'>Number of People</label>
        <select
          name='guestNumber'
          id='number'
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
