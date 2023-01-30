import base64 from 'base-64';

export async function bookingClient(body) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const response = await fetch('https://mern-restaurant-api-production.up.railway.app/reservation', {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  console.log('!!! Created New one : ', data);
  return data.guest;
}

//1
export async function adminLogin(loginInfo) {
  const { id, password } = loginInfo;
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + base64.encode(id + ':' + password));
  const response = await fetch('https://mern-restaurant-api-production.up.railway.app/admin/login', {
    method: 'POST',
    headers: headers,
  });
  const data = await response.json();
  return data;
}

export async function getAllClient(jwt) {
  const headers = new Headers();
  headers.set('jwt', jwt);
  const response = await fetch('https://mern-restaurant-api-production.up.railway.app/reservation', {
    method: 'GET',
    headers: headers,
  });
  const data = await response.json();
  return data.reservations;
}

export async function updateClient(jwt, body, sendId) {
  const headers = new Headers();
  headers.set('jwt', jwt);
  headers.append('Content-Type', 'application/json');
  console.log('>>>>', jwt, body, headers);
  const response = await fetch(`https://mern-restaurant-api-production.up.railway.app/reservation/${sendId}`, {
    method: 'PUT',
    headers: headers,
    body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  return data.updatedReservation;
}

export async function deleteClient(jwt, deleteId) {
  const headers = new Headers();
  headers.set('jwt', jwt);
  headers.append('Content-Type', 'application/json');
  const response = await fetch(
    `https://mern-restaurant-api-production.up.railway.app/reservation/${deleteId}`,
    {
      method: 'DELETE',
      headers: headers,
      // body: body,
      redirect: 'follow',
    }
  );
  const data = await response.json();
  console.log('====', data);
  return data.deletedReservation;
}

export async function searchMobile(jwt, mobile) {
  const headers = new Headers();
  headers.set('jwt', jwt);
  headers.append('Content-Type', 'application/json');
  const response = await fetch(`https://mern-restaurant-api-production.up.railway.app/reservation/${mobile}`, {
    method: 'GET',
    headers: headers,
    // body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  console.log('==fetch_searchmobile: ===', data);
  return data;
}
// data1.reservations.map(
//   (reserve) =>
//     setSearchedClients((prev) => [
//       ...prev,
//       { guest: reserve.guest, inConfirmed: reserve.isConfirmed },
//     ])
//   // setSearchedClients( {reserve.guest, reserve.isConfirmed })
// );
// .then((res) => console.log('line 58 <<<===', res[0].guest))
// .then((data) =>
//   data.map((client) => console.log(' line 59, ###', client))
// );
// .then((data) => data.map((client) => setSearchedClients(client)));

// state: { searchedClients, handleUpdate, handleDelete, handleState },
// await searchMobile(jwtValue, mobile).then((searchedClients) =>
//   navigate(`/admin/search/${mobile}`, {
//     state: { searchedClients, handleUpdate, handleDelete, handleState },
//   })
// );
// };
