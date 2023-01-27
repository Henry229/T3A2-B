import React from 'react';

const BookingList = ({ client, onUpdate, onDelete }) => {
  return (
    <>
      <section>
        <h2>Booking List</h2>
        <h3>Need to confirm</h3>
        <ul>
          {notOkClient.map((client) => (
            <DoConfirm
              key={client._id}
              client={client}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              updateUsingState={handleState}
              updateInform={handleUpdate}
            />
          ))}
        </ul>
      </section>
      <section>
        <h3>Completed Booking</h3>
        <ul>
          {okClient.map((client) => (
            <DoConfirm
              key={client._id}
              client={client}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              updateUsingState={handleState}
              updateInform={handleUpdate}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default BookingList;
