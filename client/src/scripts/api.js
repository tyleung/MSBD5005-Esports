import axios from 'axios';

// const apiUrl = 'https://api-dot-msbd5005-esports.appspot.com';
const apiUrl = 'http://localhost:8081';

const api = {
  testApiCall: () => {
    axios.get(apiUrl + '/testdsada').then(response => {
      // handle success
      console.log(response.data);
    });
  }
};

export default api;
