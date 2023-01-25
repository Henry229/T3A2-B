import base64 from 'base-64';

const headers = new Headers();

export async function bookingClient(bookingPerson) {
  const response = (
    await fetch('http://localhost:3000/reservation', {
      method: 'POST',
      body: JSON.stringify(bookingPerson),
    })
  ).json;
  return response.data.guest;
}

export async function adminLogin(loginInfo) {
  const { id, password } = loginInfo;
  headers.set('Authorization', 'Basic ' + base64.encode(id + ':' + password));
  const response = await fetch('http://localhost:3000/admin/login', {
    method: 'POST',
    headers: headers,
  });
  const data = await response.json();
  console.log('&&&', data);
  return data;
}

export async function getAllClient(jwt) {
  headers.set('jwt', jwt);
  const response = await fetch('http://localhost:3000/reservation', {
    method: 'GET',
    headers: headers,
  });
  const data = await response.json();
  return data.reservations;
}

export async function updateClient(jwt, body, sendId) {
  headers.set('jwt', jwt);
  headers.append('Content-Type', 'application/json');
  const response = await fetch(`http://localhost:3000/reservation/${sendId}`, {
    method: 'PUT',
    headers: headers,
    body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  console.log('====', data);
  return data.updatedReservation;
}
