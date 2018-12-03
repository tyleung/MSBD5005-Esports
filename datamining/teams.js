var Crawler = require('crawler');
var fs = require('fs');

gameName = process.argv[2];
if (gameName === undefined) {
  throw Error('Missing argument: gameName');
}

var teamfile = './data/' + gameName + '-teams.csv';

fs.writeFile(teamfile, '', err => {});

var noop = () => {};

function appendToFile(filename, text) {
  fs.appendFile(filename, text, err => {
    if (err) throw err;
  });
}

// read the {game}-rankings.csv
function getTeamsURL(filename) {
  var content = fs.readFileSync(filename, 'utf8');
  var rows = content.split('\n');
  var teams = rows.map(function(row) {
    row = row.split(',');
    return row[row.length - 1];
  });

  unique = teams.filter((x, idx, self) => {
    return self.indexOf(x) === idx;
  });

  links = unique.map(teamname => {
    // tn = teamname.replace(/ /g, '_')
    return (
      'https://liquipedia.net/' + gameName + '/' + encodeURIComponent(teamname)
    );
  });

  return links;
}

var crawler = new Crawler({
  maxConnections: 10,
  options: {
    // Move on if request fails to avoid being rate limited due to invalid querying
    retries: 0
  },
  callback: function(err, res, done) {
    if (err) {
      console.log(err);
    }

    var $ = res.$;
    var team = $($('div.infobox-header')[0])
      .children()
      .remove()
      .end()
      .text();
    var box = $('.fo-nttax-infobox').children();
    var country = box
      .eq(3)
      .children()
      .eq(1)
      .text();
    var region = box
      .eq(4)
      .children()
      .eq(1)
      .text();

    var text = [gameName, team, country, region].join(',') + '\n';
    // console.log(text)
    appendToFile(teamfile, text, noop);

    done();
  }
});

links = getTeamsURL('./data/' + gameName + '-rankings.csv');
crawler.queue(links);
