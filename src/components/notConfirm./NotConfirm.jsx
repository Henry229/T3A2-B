import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import UpdateModal from '../updateModal/UpdateModal';

const NotConfirm = ({
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
  const stringDate = date;
  // console.log(stringDate);
  const handleDelete = () => {
    onDelete(client);
  };
  return (
    <>
      <li onClick={() => setClick(() => true)}>
        <input
          type='checkbox'
          checked={isConfirmed === true}
          onChange={handleChange}
        />
        <span>{date}</span>
        <span>{`${firstName} ${lastName}`}</span>
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
            />
          )}
        </div>
      </li>
    </>
  );
};

export default NotConfirm;
