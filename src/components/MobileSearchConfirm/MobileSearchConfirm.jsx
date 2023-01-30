import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import UpdateModal from '../updateModal/UpdateModal';

const MobileSearchConfirm = ({
  client,
  onUpdate,
  onDelete,
  updateUsingState,
  updateInform,
}) => {
  const [click, setClick] = useState(false);
  const { _id, isConfirmed } = client;
  const { date, lastName, firstName, mobile } = client.guest;
  const handleChange = (e) => {
    const isConfirmed = e.target.checked ? true : false;
    onUpdate({ ...client, isConfirmed });
  };

  const handleDelete = () => {
    onDelete(client);
  };

  const handleCancel = () => {
    setClick(false);
    console.log('>>>>>====', click);
  };

  const stringDate = date.slice(0, 10);
  const stringTime = date.slice(11, 16);
  const combineName = `${firstName} ${lastName}`;

  return (
    <>
      <li
        onClick={() => {
          setClick(true);
          console.log('<<<<<<====', click);
        }}
      >
        <input
          type='checkbox'
          checked={isConfirmed === true}
          onChange={handleChange}
        />
        <span>{stringDate}</span>
        <span>{stringTime}</span>
        <span>{combineName}</span>
        <span>{mobile}</span>
        <button onClick={handleDelete}>
          <FaTrashAlt />
        </button>
        <div>
          {click && (
            <UpdateModal
              client={client}
              updateUsingState={updateUsingState}
              updateInform={updateInform}
              onCancel={handleCancel}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default MobileSearchConfirm;
