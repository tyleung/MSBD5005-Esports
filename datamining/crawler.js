var Crawler = require('crawler');
var fs = require('fs');

gameName = process.argv[2];
if (gameName === undefined) {
  throw Error('Missing argument: gameName');
}
var filename = './data/' + gameName + '-rankings.csv';
var linkfile = './links.txt';

fs.writeFile(filename, '', err => {});

function getLinks(filename) {
  var content = fs.readFileSync(filename, 'utf8');
  return content.split('\n');
}

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // var eh = $("div.infobox-header ")
      var tourney = $($('div.infobox-header')[0])
        .children()
        .remove()
        .end()
        .text();
      var table = $("tr[class*='place']", 'table.prizepooltable');
      rank = 1;
      prevPrize = 0;
      rowSpanOver1Counter = 0;

      // Iterate over each row
      table.each(function(i, elem) {
        text = tourney + ',';
        numCols = $(this).children('td').length;
        placetd = $(this).children('td')[0];
        placetdRowSpan = $(placetd).attr('rowspan') || 1;

        text += rank + ',';
        if (rowSpanOver1Counter === 0) {
          rowSpanOver1Counter = placetdRowSpan - 1;
          prizetd = $(this).children('td')[1];
          prize = $(prizetd)
            .text()
            .trim()
            .replace(/,/g, '')
            .replace('$', '');
          prevPrize = prize;
          text += prize + ',';
        } else {
          rowSpanOver1Counter -= 1;

          if (numCols > 1) {
            prizetd = $(this).children('td')[0];
            prize = $(prizetd)
              .text()
              .trim()
              .replace(/,/g, '')
              .replace('$', '');
            prevPrize = prize;
            text += prize + ',';
          } else {
            text += prevPrize + ',';
          }
        }

        teamtd = $(this).children('td')[numCols - 1];
        team = $(teamtd)
          .text()
          .trim();
        text += team;
        text += '\n';
        rank += 1;
        fs.appendFile(filename, text, err => {
          if (err) throw err;
        });
      });
    }
    done();
  }
});

// now you dont have to manually add the links here
// it gets links from links.txt which getlinks.js outputs
links = getLinks(linkfile).filter(x => !!x);
c.queue(links);
