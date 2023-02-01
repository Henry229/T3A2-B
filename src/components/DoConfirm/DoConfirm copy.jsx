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
      {/* <table className='table-fixed'> */}
      {/* <li onClick={() => setClick(true)}> */}
      {/* <section> */}
      {/* <tbody> */}
      <tr onClick={() => setClick(true)} className='bg-gray-100 text-zinc-800'>
        <td className='border px-4 py-2'>
          <input
            type='checkbox'
            checked={isConfirmed}
            onChange={handleChange}
          />
        </td>
        <td className='border px-4 py-2'>{stringDate}</td>
        <td className='border px-4 py-2'>{stringTime}</td>
        <td className='border px-4 py-2'>{combineName}</td>
        <td className='border px-4 py-2'>{mobile}</td>
        <td className='border px-4 py-2'>
          <button onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </td>
      </tr>
      {/* </tbody> */}
      {/* </tbody> */}
      {/* <div onClick={() => setClick(false)}> */}
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
      {/* </section> */}
      {/* </table> */}
    </>
  );
};

export default DoConfirm;
