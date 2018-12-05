import { Countries, countries_EU } from "./countries";
import * as Datamap from "datamaps";
import { getTournamentAggregate } from "./api";

//basic map config with custom fills, mercator projection
var countries_EU_shortcode = [];
var data_EU = {};

var countries_EU_short = Object.keys(Countries).map(function(key) {
	if (countries_EU.indexOf(Countries[key]) > 0) {
		countries_EU_shortcode.push(key);
	}
});

countries_EU_shortcode.forEach(code => {
	data_EU[code] = { fillKey: "alpha25" };
});

var other_countries = ["USA", "CAN", "AUS", "RUS", "CHN", "KOR"];

//other_countries.forEach(code => {
//    data_EU[code] = {fillKey: 'alpha25'}
//});

data_EU["CHN"] = { fillKey: "alpha100" };
data_EU["TWN"] = { fillKey: "alpha100" };
data_EU["USA"] = { fillKey: "alpha100" };
data_EU["KOR"] = { fillKey: "alpha100" };
data_EU["SWE"] = { fillKey: "alpha65" };
data_EU["DNK"] = { fillKey: "alpha65" };
data_EU["RUS"] = { fillKey: "alpha65" };
data_EU["CAN"] = { fillKey: "alpha65" };
data_EU["FRA"] = { fillKey: "alpha65" };
data_EU["FIN"] = { fillKey: "alpha65" };
data_EU["UKR"] = { fillKey: "alpha65" };
data_EU["GBR"] = { fillKey: "alpha65" };
data_EU["AUS"] = { fillKey: "alpha50" };
data_EU["BRA"] = { fillKey: "alpha50" };
data_EU["POL"] = { fillKey: "alpha50" };

var map = new Datamap({
	scope: "world",
	element: document.getElementById("container1"),
	projection: "mercator",
	height: 600,
	fills: {
		defaultFill: "#c2bdc5",
		alpha25: "rgba(0, 0, 255, 0.25)",
		alpha50: "rgba(0, 0, 255, 0.50)",
		alpha65: "rgba(0, 0, 255, 0.65)",
		alpha100: "blue"
	},

	data: data_EU
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
    CHN: {fillKey: 'gt50' },
    USA: {fillKey: 'lt50' },
    RUS: {fillKey: 'lt50' },
    CAN: {fillKey: 'lt50' },
    BRA: {fillKey: 'gt50' },
    ARG: {fillKey: 'gt50' },
    COL: {fillKey: 'gt50' },
    AUS: {fillKey: 'gt50' },
    ZAF: {fillKey: 'gt50' },
    MAD: {fillKey: 'gt50' }
}

/**
 * {
    name: 'Not a bomb, but centered on Brazil',
    radius: 23,
    centered: 'BRA',
    country: 'USA',
    yeild: 0,
    fillKey: 'USA',
    date: '1954-03-01'
  },
 */

function getCountryShortKey(value) {
    return Object.keys(Countries).find(key => Countries[key] === value);
}

 function scaler(val, min, max, yMax, yMin) {
     var percent = (val - yMin) / (yMax - yMin);
    return percent * (max - min) + min;
 }

 function scaleToMinMax(data, min, max) {
    min = min || 24;
    max = max || 55;
    var values = data.map(obj => obj["sum(`prizePool`)"]);
    // console.log(values)
    var d_max = Math.max(...values)
    var d_min = Math.min(...values)

    // console.log(d_max)

    return data.map(obj => {
        return {
            'centered': getCountryShortKey(obj.country),
            'country': obj.country,
            'radius': scaler(obj["sum(`prizePool`)"], min, max, d_max, d_min),
            'fillKey': 'blue',
            'prize': obj["sum(`prizePool`)"]
        }
    });    
 }


d3.select('#update').on('click', function(e) {
    var prom = getTournamentAggregate();

    prom.then(results => {
        // console.log(results)

        var bubble_data = scaleToMinMax(results)

        console.log(bubble_data)

        var test =[{centered: 'BRA', country: "Brazil", radius: 8.469041905584701, fillKey: "blue", prize: 800000}];
        
        map.bubbles(bubble_data, {
            popupTemplate: function(geo, data) {
                return "<div class='hoverinfo'>Total tournament prize for this location " + data.prize + "</div>";
            }
        });
        
        map.updateChoropleth(data);
    });
});