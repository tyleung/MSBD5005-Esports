//basic map config with custom fills, mercator projection
countries_EU = [
    'Russia',
    'Ukraine',
    'France',
    'Spain',
    'Sweden',
    'Norway',
    'Germany',
    'Finland',
    'Poland',
    'Italy',
    'United Kingdom',
    'Romania',
    'Belarus',
    'Greece',
    'Bulgaria',
    'Iceland',
    'Hungary',
    'Portugal',
    'Austria',
    'Czech Republic',
    'Republic of Serbia',
    'Bosnia and Herzegovina',
    'Ireland',
    'Lithuania',
    'Latvia',
    'Croatia',
    'Slovakia',
    'Estonia',
    'Denmark',
    'Switzerland',
    'Netherlands',
    'Moldova',
    'Belgium',
    'Armenia',
    'Albania',
    'Macedonia',
    'Turkey',
    'Slovenia',
    'Montenegro',
    'Cyprus',
    'Luxembourg',
    'Andorra',
    'Malta',
    'Liechtenstein',
    'San Marino',
    'Monaco',
    'Kosovo'
]
countries_EU_shortcode = []
data_EU = {}

countries_EU_short = Object.keys(Countries).map(function(key) {
    // console.log(obj)
    if(countries_EU.indexOf(Countries[key]) > 0) {
        countries_EU_shortcode.push(key)
    }
});

countries_EU_shortcode.forEach(code => {
    data_EU[code] = {fillKey: 'lb50'}
})

other_countries = [
    'USA',
    'CAN',
    'AUS',
    'RUS',
    'CHN',
    'KOR'
]

other_countries.forEach(code => {
    data_EU[code] = {fillKey: 'gt50'}
})

var map = new Datamap({
    scope: 'world',
    element: document.getElementById('container1'),
    projection: 'mercator',
    height: 600,
    fills: {
      defaultFill: '#c2bdc5',
      lt50: 'rgba(0,244,244,0.9)',
      lb50: 'rgba(10, 225, 225, 0.9)',
      gt50: 'red'
    },

    data: data_EU
    
    // data: {
    //   CHN: {fillKey: 'gt50'},
    //   USA: {fillKey: 'lt50' },
    //   RUS: {fillKey: 'lt50' },
    //   CAN: {fillKey: 'lt50' },
    //   BRA: {fillKey: 'gt50' },
    //   ARG: {fillKey: 'gt50'},
    //   COL: {fillKey: 'gt50' },
    //   AUS: {fillKey: 'gt50' },
    //   ZAF: {fillKey: 'gt50' },
    //   MAD: {fillKey: 'gt50' }       
    // }
  })
  
  
  //sample of the arc plugin
  /*map.arc([
   {
    origin: {
        latitude: 40.639722,
        longitude: 73.778889
    },
    destination: {
        latitude: 37.618889,
        longitude: -122.375
    }
  },
  {
      origin: {
          latitude: 30.194444,
          longitude: -97.67
      },
      destination: {
          latitude: 25.793333,
          longitude: -0.290556
      }
  }
  ], {strokeWidth: 2});*/
   
  
   //bubbles, custom popup on hover template
//  map.bubbles([
//    {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'gt50'},
//    {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 18, fillKey: 'lt50'},
//    {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 8, fillKey: 'gt50'},

//  ], {
//    popupTemplate: function(geo, data) {
//      return "<div class='hoverinfo'>It is " + data.name + "</div>";
//    }
//  });s