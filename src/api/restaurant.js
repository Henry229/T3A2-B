import axios from 'axios';
import AdminLogin from '../pages/AdminLogin';

export default class Restaurant {
  constructor() {
    this.httpServer = axios.create({
      baseURL: 'http://localhost:3000/',
    });
  }
  async bookingClient(bookingPerson) {
    return this.httpServer.post('/reservation', bookingPerson).then((res) => {
      res.data.guest;
    });
  }
  async adminLogin(loginInfo) {
    const { id, password } = loginInfo;
    return this.httpServer
      .post('/admin/login', loginInfo, {
        headers: { Authorization: 'Basic ' + btoa(id + ':' + password) },
      })
      .then((res) => {
        res.data;
      });
  }
}
