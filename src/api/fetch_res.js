import base64 from 'base-64';

export async function bookingClient(body) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  console.log(body)
  const response = await fetch('https://mern-restaurant-api-production.up.railway.app/reservation', {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow',
  });
  const data = await response.json();
  return data;
  //Make useClient state global here
}

//1
export async function adminLogin(loginInfo) {
  try {
    const { id, password } = loginInfo;
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(id + ':' + password));
    const response = await fetch('https://mern-restaurant-api-production.up.railway.app/admin/login', {
      method: 'POST',
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Response : ${response.statusText}`);
    }
  } catch (error) {
    return {
      isError: true,
      errorData: {
        message: error.message,
        statusCode: error.status,
      },
    };
  }
}

export async function getAllClient(jwt) {
  try {
    const headers = new Headers();
    headers.set('jwt', jwt);
    const response = await fetch('https://mern-restaurant-api-production.up.railway.app/reservation', {
      method: 'GET',
      headers: headers,
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data;
    } else {
      throw new Error(`Response : ${response.statusText}`);
    }
  } catch (error) {
    return {
      isError: true,
      errorData: {
        message: error.message,
        statusCode: error.status,
      },
    };
  }
}

export async function updateClient(jwt, body, sendId) {
  try {
    const headers = new Headers();
    headers.set('jwt', jwt);
    headers.append('Content-Type', 'application/json');
    const response = await fetch(
      `https://mern-restaurant-api-production.up.railway.app/reservation/${sendId}`,
      {
        method: 'PUT',
        headers: headers,
        body: body,
        redirect: 'follow',
      }
    );
    const data = await response.json();
    return data
  } catch (error) {
    return {
      isError: true,
      errorData: {
        message: error.message,
        statusCode: error.status,
      },
    };
  }

}

export async function deleteClient(jwt, deleteId) {
  try {
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
    if (response.ok) {
      const data = await response.json();
      console.log('====', data);
      return data;
    } else {
      throw new Error(`Response : ${response.statusText}`);
    }
  } catch (error) {
    return {
      isError: true,
      errorData: {
        message: error.message,
        statusCode: error.status,
      },
    };
  }
  // return data.deletedReservation;
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
  return data;
}
