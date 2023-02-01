import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import UpdateModal from '../updateModal/UpdateModal';

const DoConfirm = ({
  client,
  onUpdate,
  onDelete,
  updateUsingState,
  updateInform,
}) => {
  const [click, setClick] = useState(false);
  const { _id, isConfirmed } = client;
  const { date, lastName, firstName, mobile, guestNumber } = client.guest;
  const handleChange = (e) => {
    const isConfirmed = e.target.checked ? true : false;
    onUpdate({ ...client, isConfirmed }, true);
  };

  const handleDelete = () => {
    const areYouSure = confirm(`Cancel reservation made by\n${firstName} ${lastName}\nat ${new Date(date).toLocaleString()}`)
    areYouSure && onDelete(client)
  };

  const handleCancel = () => {
    setClick(false);
  };

  const stringDate = new Date(date).toLocaleString()
  const combineName = `${firstName} ${lastName}`;

  return (
    <>
      <li onClick={() => setClick(true)}>
        <input
          type='checkbox'
          checked={isConfirmed === true}
          onChange={handleChange}
        />
        <span>{stringDate},</span>
        <span> Table {client.table.tableNumber},</span>
        <span> Guest number {guestNumber},</span>
        <span>{` ${combineName},`}</span>
        <span>{` ${mobile} `}</span>
        <button onClick={handleDelete}>
          <FaTrashAlt />
        </button>
        <div onClick={() => setClick(false)}>
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

export default DoConfirm;
