var Crawler = require('crawler');
var fs = require('fs');

var teamfile = './data/dota_teams.csv';
var game = 'dota2'

fs.writeFile(teamfile, '', (err => {}));

var noop = () => {}

function appendToFile(filename, text) {
    fs.appendFile(filename, text, (err) => {
        if (err) throw err;
    });
}

// read the {game}-rankings.csv
function getTeamsURL(filename) {
    var content = fs.readFileSync(filename, 'utf8');
    var rows = content.split('\n');
    var teams = rows.map(row => row.split(',')[1]);

    unique = teams.filter((x, idx, self) => {
        return self.indexOf(x) === idx;
    });

    links = unique.map(teamname => {
        // tn = teamname.replace(/ /g, '_')
        return 'https://liquipedia.net/' + game + '/' + encodeURIComponent(teamname)
    })

    return links;
}


var crawler = new Crawler({
    maxConnections: 10,
    callback: function(err, res, done) {
        if (err) console.log(err);

        var $ = res.$;
        var team = $($('div.infobox-header')[0]).children().remove().end().text();
        var box = $('.fo-nttax-infobox').children();
        var country = box.eq(3).children().eq(1).text()
        var region = box.eq(4).children().eq(1).text()

        var text = [game, team, country, region, '\n'].join(',')
        // console.log(text)
        appendToFile(teamfile, text, noop)

        done()
    }
});

links = getTeamsURL("./data/dota-rankings.csv");
crawler.queue(links);