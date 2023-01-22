import axios from 'axios';

export default class Restaurant {
  constructor() {
    this.httpServer = axios.create({
      baseURL: 'http://localhost:3000/',
    });
  }
  async bookingClient(bookingPerson) {
    return this.httpServer.post('/reservation', bookingPerson).then((res) => {
      console.log('---yogida1: ', res);
      res.data;
    });
  }
}
