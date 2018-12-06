import { Countries, countries_EU } from './countries';
import * as Datamap from 'datamaps';
import { formatter } from './utils';
import { getTournamentAggregate, getTournamentByAggregateTime } from './api';

//basic map config with custom fills, mercator projection
var countries_EU_shortcode = [];
var data_EU = {};

var default_color = {};
Object.keys(Countries).map(l => {
  var d_f = { fillKey: 'defaultFill' };
  default_color[Countries[l]] = d_f;
});

Object.keys(Countries).map(function(key) {
  if (countries_EU.indexOf(key) > 0) {
    countries_EU_shortcode.push(Countries[key]);
  }
});

countries_EU_shortcode.forEach(code => {
  data_EU[code] = { fillKey: 'g3' };
});

data_EU['CHN'] = { fillKey: 'g1' };
data_EU['TWN'] = { fillKey: 'g3' };
data_EU['USA'] = { fillKey: 'g0' };
data_EU['KOR'] = { fillKey: 'g0' };
data_EU['SWE'] = { fillKey: 'g4' };
data_EU['DNK'] = { fillKey: 'g3' };
data_EU['RUS'] = { fillKey: 'g3' };
data_EU['CAN'] = { fillKey: 'g4' };
data_EU['FRA'] = { fillKey: 'g3' };
data_EU['FIN'] = { fillKey: 'g4' };
data_EU['UKR'] = { fillKey: 'g4' };
data_EU['GBR'] = { fillKey: 'g0' };
data_EU['AUS'] = { fillKey: 'g3' };
data_EU['BRA'] = { fillKey: 'g4' };
data_EU['POL'] = { fillKey: 'g4' };
data_EU['ECU'] = { fillKey: 'g5' };
data_EU['CHL'] = { fillKey: 'g5' };
data_EU['ZAF'] = { fillKey: 'g5' };
data_EU['SAU'] = { fillKey: 'g5' };
data_EU['DEU'] = { fillKey: 'g1' };
data_EU['PHL'] = { fillKey: 'g2' };

var map = new Datamap({
  scope: 'world',
  element: document.getElementById('container1'),
  projection: 'mercator',
  height: 600,
  fills: {
    defaultFill: '#c2bdc5',
    // alpha25: 'rgba(0, 0, 255, 0.25)',
    // alpha50: 'rgba(0, 0, 255, 0.50)',
    // alpha65: 'rgba(0, 0, 255, 0.65)',
    // highest: 'rgba(127, 39, 4, 1)',
    dota: '#ff0000',
    csgo: '#b3b300',
    overwatch: '#000000',
    rocketleague: '#3366ff',
    lol: '#00cc66',
    g0: 'rgb(127,39,4)',
    g1: 'rgb(166,54,3)',
    g2: 'rgb(217,72,1)',
    g3: 'rgb(241,105,19)',
    g4: 'rgb(253,141,60)',
    g5: 'rgb(253,174,107)',
    g6: 'rgb(253,208,162)'
  },

  data: data_EU
});

map.legend({
    defaultFillName: "No data",
    labels: {
      dota: 'Dota 2',
      csgo: 'Counter Strike',
    overwatch: 'Overwatch',
    rocketleague: 'Rocket League',
    lol: 'League of Legends',
      g0: "Highest",
      g6: "Lowest"}
    });

//sample of the arc plugin
// map.arc([
//     {
// 		origin: {
//             latitude: 40.639722,
//             longitude: 73.778889
// 		},
// 		destination: {
//             latitude: 37.618889,
//             longitude: -122.375
// 		}
// 	},
// 	{
//         origin: {
//             latitude: 30.194444,
//             longitude: -97.67
//         },
//         destination: {
//             latitude: 25.793333,
//             longitude: -0.290556
//         }
// 	}
// ], {strokeWidth: 2});

// bubbles, custom popup on hover template
//  map.bubbles([
//    {name: 'Hot', latitude: 21.32, longitude: 5.32, radius: 10, fillKey: 'gt50'},
//    {name: 'Chilly', latitude: -25.32, longitude: 120.32, radius: 18, fillKey: 'lt50'},
//    {name: 'Hot again', latitude: 21.32, longitude: -84.32, radius: 8, fillKey: 'gt50'},

//  ], {
//    popupTemplate: function(geo, data) {
//      return "<div class='hoverinfo'>Total tournament prize for this location " + data.name + "</div>";
//    }
//  });

var data = {
  CHN: { fillKey: 'gt50' },
  USA: { fillKey: 'lt50' },
  RUS: { fillKey: 'lt50' },
  CAN: { fillKey: 'lt50' },
  BRA: { fillKey: 'gt50' },
  ARG: { fillKey: 'gt50' },
  COL: { fillKey: 'gt50' },
  AUS: { fillKey: 'gt50' },
  ZAF: { fillKey: 'gt50' },
  MAD: { fillKey: 'gt50' }
};

function getCountryShortKey(value) {
  return Countries[value];
}

function scaler(val, min, max, yMax, yMin) {
  var percent = (val - yMin) / (yMax - yMin);
  return percent * (max - min) + min;
}

function fillKeyByGameId(key) {
  console.log(key)
  var ret = ''
  switch(key) {
    case 1:
      ret = 'dota';
      break;
    case 2:
      ret = 'csgo';
      break;
    case 3:
      ret = 'overwatch';
      break;
    case 4:
      ret = 'rocketleague';
      break;
    case 5:
      ret = 'lol';
      break;
    default:
      break;
  }
  return ret;
}

function scaleToMinMax(data, col, min, max) {
  min = min || 24;
  max = max || 55;
  var values = data.map(obj => obj[col]);
  // console.log(values)
  var d_max = Math.max(...values);
  var d_min = Math.min(...values);

  // console.log(data)

  return data.reduce((arr, obj) => {
    var centered = getCountryShortKey(obj.country);
    if (centered == null) {
      return arr;
    }

    var d = {
      centered: centered,
      country: obj.country,
      radius: scaler(obj[col], min, max, d_max, d_min),
      prize: obj[col],
      fillKey: fillKeyByGameId(obj.gameId)
    };
    arr.push(d);
    return arr;
  }, []);
}

d3.select('#update').on('click', function(e) {
  var m = 1;
  setInterval(function() {
    updateByMonth(m++);
  }, 2000)
});

var BEGIN_DATE = 2014; // 2015 Jan
// get the number of months since BEGIN_DATE
function getMonthOffset(row) {
  if (row.year < BEGIN_DATE) {
    var offset = 0;
  } else {
    var offset = (row.year - BEGIN_DATE) * 12 + row.month;
  }

  return {
    country: row.country,
    prize: row.prize,
    gameId: row.gameId,
    offset
  };
}

var d_temporal = [];
getTournamentByAggregateTime().then(results => {
  // country, year, month, prize
  d_temporal = results[0].map(getMonthOffset);
  // console.log(results);
});

function offsetToDate(offset) {
  var year = Math.floor(offset / 12) + BEGIN_DATE;
  var month = offset % 12;

  return year + '-' + month;
}

function updateByMonth(val) {
  document.getElementById('currDate').innerText = offsetToDate(val);

  var thistime = d_temporal.filter(row => {
    return row.offset == val;
  });

  var bubbles = scaleToMinMax(thistime, 'prize');

  // console.log(bubbles.length)
  var values = bubbles.map(x => x.prize);
  // console.log(values)
  var d_max = Math.max(...values);
  var colors = {};
  bubbles.forEach(bubble => {
    var country = bubble.centered;
    var ratio = bubble.prize / d_max;
    var fillKey = '';

    if (ratio >= 0.95) {
      fillKey = 'g0';
    } else if (ratio >= 0.85) {
      fillKey = 'g1';
    } else if (ratio >= 0.7) {
      fillKey = 'g2';
    } else if (ratio >= 0.55) {
      fillKey = 'g3';
    } else if (ratio >= 0.4) {
      fillKey = 'g4';
    } else {
      fillKey = 'g5';
    }
    colors[country] = { fillKey: fillKey };
  });

  map.bubbles(bubbles, {
    popupTemplate: function(geo, data) {
      return (
        "<div class='hoverinfo'>Total tournament prize for " +
        data.country +
        ': ' +
        formatter.format(data.prize) +
        '</div>'
      );
    }
  });

  map.updateChoropleth(default_color);
  map.updateChoropleth(colors);
}

d3.select('#slider').on('change', function(e) {
  var t_offset = parseInt(document.getElementById('slider').value);
  document.getElementById('currDate').innerText = offsetToDate(t_offset);

  var thistime = d_temporal.filter(row => {
    return row.offset == t_offset;
  });

  var bubbles = scaleToMinMax(thistime, 'prize');

  // console.log(bubbles.length)
  var values = bubbles.map(x => x.prize);
  // console.log(values)
  var d_max = Math.max(...values);
  var colors = {};
  bubbles.forEach(bubble => {
    var country = bubble.centered;
    var ratio = bubble.prize / d_max;
    var fillKey = '';

    if (ratio >= 0.95) {
      fillKey = 'g0';
    } else if (ratio >= 0.85) {
      fillKey = 'g1';
    } else if (ratio >= 0.7) {
      fillKey = 'g2';
    } else if (ratio >= 0.55) {
      fillKey = 'g3';
    } else if (ratio >= 0.4) {
      fillKey = 'g4';
    } else {
      fillKey = 'g5';
    }
    colors[country] = { fillKey: fillKey };
  });

  map.bubbles(bubbles, {
    popupTemplate: function(geo, data) {
      return (
        "<div class='hoverinfo'>Total tournament prize for " +
        data.country +
        ': ' +
        formatter.format(data.prize) +
        '</div>'
      );
    }
  });

  map.updateChoropleth(default_color);
  map.updateChoropleth(colors);
});
