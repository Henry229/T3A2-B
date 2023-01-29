export const getConformedClients = (clients) => {
  console.log('====> Ok confirmed in function', clients);
  return clients.filter((client) => client.isConfirmed === true);
};

export const getConformingClients = (clients) => {
  console.log('++++> Not  Ok confirmed in function', clients);
  return clients.filter((client) => client.isConfirmed === false);
};
