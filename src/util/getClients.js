export const getConformedClients = (clients) => {
  return clients.filter((client) => client.isConfirmed === true);
};

export const getConformingClients = (clients) => {
  return clients.filter((client) => client.isConfirmed === false);
};
