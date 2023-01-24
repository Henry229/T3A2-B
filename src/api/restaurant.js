import axios from 'axios';

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
    const response = await this.httpServer.post('/admin/login', loginInfo, {
      headers: { Authorization: 'Basic ' + btoa(id + ':' + password) },
    });
    return (await response).data.jwt;
  }
  async getAllClient(jwt) {
    return await this.httpServer
      .get('reservation', {
        headers: { jwt: jwt },
      })
      .then((res) => {
        res.data.guest;
      });
  }
}
