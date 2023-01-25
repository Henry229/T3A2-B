import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const NotConfirm = ({ client, onUpdate }) => {
  const { _id, isConfirmed } = client;
  const { date, lastName, firstName, mobile } = client.guest;
  const handleChange = (e) => {
    const isConfirmed = e.target.checked ? true : false;
    onUpdate({ ...client, isConfirmed });
  };
  return (
    <li>
      <input
        type='checkbox'
        checked={isConfirmed === true}
        onChange={handleChange}
      />
      <span>{date}</span>
      <span>{`${firstName} ${lastName}`}</span>
      <span>{mobile}</span>
      <button>
        <FaTrashAlt />
      </button>
    </li>
  );
};

export default NotConfirm;
