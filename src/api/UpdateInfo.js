export const handleUpdate = async (updated) => {
  // console.log('***yogida10: ', updated);
  setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
  const body = JSON.stringify({
    firstName: updated.guest.firstName,
    lastName: updated.guest.lastName,
    mobile: updated.guest.mobile,
    guestNumber: updated.guest.guestNumber,
    date: updated.guest.date,
    isConfirmed: updated.isConfirmed,
  });
  const sendId = updated._id;
  await updateClient(jwtValue, body, sendId);
};

export const handleState = (updated) => {
  setClients(clients.map((c) => (c._id === updated._id ? updated : c)));
};

export const handleDelete = async (deleted) => {
  setClients(clients.filter((d) => d._id !== deleted._id));
  const deleteId = deleted._id;
  await deleteClient(jwtValue, deleteId);
};
