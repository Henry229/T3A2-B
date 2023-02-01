import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import tableClient from '../tableClient/tableClient';
import UpdateModal from '../updateModal/UpdateModal';

const DoConfirm = ({
  notOkClient,
  okClient,
  onUpdate,
  onDelete,
  updateUsingState,
  updateInform,
}) => {
  const [click, setClick] = useState(false);
  // const [tableClient, setTableClient] = useState([]);
  console.log('--> notOkClient', notOkClient);

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

  // const handleTable = (client) => {
  //   setTableClient(client);
  // };

  const buildClient = (client) => {
    const { _id, isConfirmed } = client;
    const { date, lastName, firstName, mobile } = client.guest;
    const stringDate = date.slice(0, 10);
    const stringTime = date.slice(11, 16);
    const combineName = `${firstName} ${lastName}`;
    return { isConfirmed, stringDate, stringTime, mobile, combineName };
  };

  return (
    <>
      {/* <table className='table-fixed'> */}
      {/* <li onClick={() => setClick(true)}> */}
      {/* <section> */}
      {/* <tbody> */}
      <table className='table-auto text-left'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className='px-4 py-2'>Check</th>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Time</th>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Mobile</th>
            <th className='px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {notOkClient.map((client) => {
            const { isConfirmed, stringDate, stringTime, mobile, combineName } =
              buildClient(client);
            // {
            /* <tableClient client={client} onSetClient={handleTable} />
              {console.log('-->tableClient: ', tableClient)} */
            // }
            <tr
              onClick={() => setClick(true)}
              className='bg-gray-100 text-zinc-800'
            >
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
            </tr>;
          })}
        </tbody>
      </table>
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
