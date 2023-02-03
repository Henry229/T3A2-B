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
  const { tableNumber } = client.table;
  const { date, lastName, firstName, mobile, guestNumber } = client.guest;

  const handleChange = (e) => {
    const isConfirmed = e.target.checked ? true : false;
    onUpdate({ ...client, isConfirmed }, true);
  };

  const handleDelete = () => {
    const areYouSure = confirm(
      `Cancel reservation made by\n${firstName} ${lastName}\nat ${new Date(
        date
      ).toLocaleString()}`
    );
    areYouSure && onDelete(client);
  };

  const handleCancel = () => {
    setClick(false);
    location.reload();
  };

  const stringDate = new Date(date).toLocaleString();
  const combineName = `${firstName} ${lastName}`;

  return (
    <>
      <table className='table-auto sm:table-fixed'>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr
            onClick={() => setClick(true)}
            className=' bg-zinc-800 text-gray-100'
          >
            <td className='px-4 py-2'>
              <input
                type='checkbox'
                checked={isConfirmed === true}
                onChange={handleChange}
              />
            </td>
            <td className='px-4 py-2'>{stringDate}</td>
            <td className='px-4 py-2'>Table# {tableNumber}</td>
            <td className='px-4 py-2'>{guestNumber}</td>
            <td className='px-4 py-2'>{combineName}</td>
            <td className='px-4 py-2'>{mobile}</td>
            <td className='px-4 py-2'>
              <button onClick={handleDelete}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
    </>
  );
};

export default DoConfirm;

