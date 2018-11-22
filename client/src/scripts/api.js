import axios from 'axios';

const apiUrl = process.env.API_URL;

const api = {
  testApiCall: () => {
    axios.get(apiUrl + '/test').then(response => {
      // handle success
      console.log(response.data);
    });
  }
};

export default api;
