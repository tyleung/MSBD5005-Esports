import axios from 'axios';

const apiUrl = process.env.API_URL;

function testApiCall() {
    axios.get(apiUrl + '/test').then(response => {
      // handle success
      console.log(response.data);
    });
}

/**
 * wanted output
 * {
 *      location: "country"
 *      date: "yyyy-mm"
 *      prize: "total sum of all tournaments"
 * }
 */
function getTournamentAggregate() {
    /**
    city: "United Kingdom"
    country: "Birmingham"
    endDate: "2019-06-01T16:00:00.000Z"
    gameId: "dota2"
    id: 1
    name: "ESL One Birmingham 2019"
    prizePool: 300000
    region: ""
    startDate: "2019-05-27T16:00:00.000Z"
    */
    return axios.get(apiUrl + '/tournaments_agg').then(response => {
        // getting back a json array
        // console.log(response);
        return response.data;
    }).catch(error => {
        console.log(error);
    });
}

export {
    testApiCall,
    getTournamentAggregate
};
