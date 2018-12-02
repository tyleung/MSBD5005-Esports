var Crawler = require('crawler');
var fs = require('fs');

var cl = new Crawler({
  maxConnections: 10,
  callback: function(err, res, done) {
    if (err) {
      console.log(err);
    } else {
      var $ = res.$;
      var tourney = $('div.tournament-card');

      tourney.each(function(i, elem) {
        var rows = $(this).children('.divRow');
        rows.each(function(i, elem) {
          var cells = $(this).children('.divCell');
          text = '';
          cells.each(function(i, elem) {
            if (i < 5) {
              if (i == 0) {
                text += $('b', elem)
                  .children()
                  .text()
                  .trim();
              } else if (i == 2) {
                text += $(this)
                  .text()
                  .trim()
                  .replace(/,/g, '')
                  .replace('$', '');
              } else {
                text += $(this)
                  .text()
                  .trim();
              }
              text += ',';
            }
          });
          text += '\n';
          fs.appendFile('tourney.csv', text, err => {
            if (err) throw err;
          });
        });
      });
    }
    done();
  }
});

cl.queue(['https://liquipedia.net/dota2/Premier_Tournaments']);
