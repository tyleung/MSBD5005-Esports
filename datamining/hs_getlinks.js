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
        var years = $('.content1 .wikitable')
        years.each(function(i, elem) {
            tbody = $(this).children('tbody')
            tbody.children('tr').each(function(i, elem) {
                // trim off ones without a cash prize
                prize = $(this).children('td').eq(4).text().trim()

                suffix = $(this).children('td').eq(2).children('a').attr('href');
                var link = 'https://liquipedia.net' + suffix + '\n';
                
                if(suffix && prize) {
                    appendToFile(filename, link)
                }
            });
        });
    }
    done();
  }
});

cl.queue(['https://liquipedia.net/hearthstone/Portal:Tournaments']);
