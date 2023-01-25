import axios from 'axios';
import base64 from 'base-64';

export default class Restaurant {
  constructor() {
    this.httpServer = axios.create({
      baseURL: 'http://localhost:3000/',
    });
  }
  async bookingClient(bookingPerson) {
    return await this.httpServer
      .post('/reservation', bookingPerson)
      .then((res) => {
        res.data.guest;
      });
  }

  async adminLogin(loginInfo) {
    const { id, password } = loginInfo;
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(id + ':' + password));
    const response = (
      await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: headers,
      })
    ).json;
    return response.data.jwt;
  }

  // async adminLogin(loginInfo) {
  //   const { id, password } = loginInfo;
  //   const response = await this.httpServer.post('/admin/login', loginInfo, {
  //     headers: { Authorization: 'Basic ' + btoa(id + ':' + password) },
  //   });
  //   return response.data.jwt;
  // }

  async getAllClient(jwt) {
    const response = await this.httpServer.get('reservation', {
      headers: { jwt: jwt },
    });
    // .then((res) => {
    // console.log('###', response.data.reservations);
    //   res.data;
    // });
    return response.data.reservations;
  }

  async updateClient(jwt, body, sendId) {
    const headers = new Headers();
    headers.set('jwt', jwt);
    const res2 = await (
      await fetch(`http://localhost:3000/reservation/${sendId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
      })
    ).json();

    // const response = await this.httpServer.put(
    //   'reservation/63cf6905e0908d9f15b2f097',
    //   updated,
    //   {
    //     headers: { jwt: jwt },
    //   }
    // );

    // .then((res) => {
    // console.log('###', response.data.reservations);
    //   res.data;
    // });
    return res2.data.updatedReservation;
  }
}

// async function a() {
//   const headers = new Headers()
//   headers.set('Authorization', 'Basic ' + base64.encode(loginInfo.id + ":" + loginInfo.password));
//   const res = await (await fetch('http://localhost:3000/admin/login', {method:'POST', headers: headers})).json()
//   headers.set("jwt", res.jwt)
//   const res2 = await (await fetch('http://localhost:3000/reservation/63cdf89705f48ae7604520a7', {method:'PUT', headers: headers})).json()
//   console.log(res2)
// }
