import axios from 'axios';

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
    console.log('###', loginInfo);
    const response = this.httpServer.post('/admin/login', loginInfo, {
      headers: { Authorization: 'Basic ' + btoa(id + ':' + password) },
    });
    return response;
  }
}
