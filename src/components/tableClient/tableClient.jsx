import React from 'react';

const tableClient = ({ client, onSetClient }) => {
  const clientSet = (client) => {
    onSetClient(client);
  };

  const { _id, isConfirmed } = client;
  const { date, lastName, firstName, mobile } = client.guest;
  const stringDate = date.slice(0, 10);
  const stringTime = date.slice(11, 16);
  const combineName = `${firstName} ${lastName}`;

  return (
    <div>
      <h2>tableClient</h2>
    </div>
  );
};

export default tableClient;
