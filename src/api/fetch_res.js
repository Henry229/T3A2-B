import base64 from 'base-64';

export async function bookingClient(body) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const response = await fetch('http://localhost:3000/reservation', {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  console.log('!!! Created New one : ', data);
  return data.guest;
}

export async function adminLogin(loginInfo) {
  const headers = new Headers();
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
  const headers = new Headers();
  headers.set('jwt', jwt);
  const response = await fetch('http://localhost:3000/reservation', {
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

export async function deleteClient(jwt, deleteId) {
  const headers = new Headers();
  headers.set('jwt', jwt);
  headers.append('Content-Type', 'application/json');
  const response = await fetch(
    `http://localhost:3000/reservation/${deleteId}`,
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
  const response = await fetch(`http://localhost:3000/reservation/${mobile}`, {
    method: 'GET',
    headers: headers,
    // body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  console.log('====', data.reservations);
  return data.reservations;
}
