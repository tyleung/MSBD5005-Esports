var Crawler = require('crawler');
var fs = require('fs');

filename = 'links.txt';

// clear file content
fs.writeFile(filename, '', err => {
  return false;
});

function appendToFile(filename, text) {
  fs.appendFile(filename, text, err => {
    if (err) throw err;
  });
}

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
          var first = $(this).children('.Tournament');

          link =
            'https://liquipedia.net' +
            $('b', first)
              .children()
              .attr('href') +
            '\n';
          appendToFile(filename, link);
        });
      });
    }
    done();
  }
});

cl.queue(['https://liquipedia.net/counterstrike/Premier_Tournaments']);
