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
  const [mobileClick, setMobileClick] = useState(false);
  const { _id, isConfirmed, tableNumber } = client;
  const { date, lastName, firstName, mobile } = client.guest;
  const handleChange = (e) => {
    const isConfirmed = e.target.checked ? true : false;
    onUpdate({ ...client, isConfirmed });
  };

  const handleDelete = () => {
    onDelete(client);
  };

  const handleCancel = () => {
    setMobileClick(false);
    console.log('>>>>>====', mobileClick);
  };

  const stringDate = date.slice(0, 10);
  const stringTime = date.slice(11, 16);
  const combineName = `${firstName} ${lastName}`;

  return (
    <>
      <table className='table-auto sm:table-'>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr
            onClick={() => setMobileClick(true)}
            className=' bg-zinc-800 text-gray-100'
          >
            <td className='px-4 py-2'>
              <input
                type='checkbox'
                checked={isConfirmed}
                onChange={handleChange}
              />
            </td>
            <td className='px-4 py-2'>Table# {tableNumber}</td>
            <td className='px-4 py-2'>{stringDate}</td>
            <td className='px-4 py-2'>{stringTime}</td>
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
        {mobileClick && (
          <UpdateModal
            client={client}
            updateUsingState={updateUsingState}
            updateInform={updateInform}
            onCancel={handleCancel}
          />
        )}
      </div>
      {/* <li
        onClick={() => {
          setMobileClick(true);
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
      </li> */}
    </>
  );
};

export default MobileSearchConfirm;
