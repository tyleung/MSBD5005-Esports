import { Countries, countries_EU } from "./countries";
import * as Datamap from "datamaps";

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
});

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
