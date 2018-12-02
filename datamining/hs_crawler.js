var Crawler = require('crawler');
var fs = require('fs');

var filename = './data/hs-rankings.csv';
var linkfile = './links.txt';

fs.writeFile(filename, '', err => {});

function getLinks(filename) {
    var content = fs.readFileSync(filename, 'utf8');
    return content.split('\n');
}

function appendToFile(filename, text) {
    fs.appendFile(filename, text, (err) => {
        if (err) throw err;
    });
}

var crawler = new Crawler({
    maxConnections: 10,
    callback: function(err, res, done) {
        if (err) console.log(err)

        var $ = res.$;
        var tourney = $($('div.infobox-header')[0]).children().remove().end().text();
        var rows = $("tr[class*='place']", 'table.prizepooltable');

        var rank = 1;
        var prevPrize = ''
        // first column tournament name
        
        rows.each(function(i, elem) {
            var text = tourney + ',';
            tds = $(this).children('td');
            // second column team rank
            text += rank + ',';
            rank++

            // third column prize
            if(tds.length < 3) {
                // composite row, use previous prize
                text += prevPrize + ','
                // player name
                text += tds.eq(0).text().trim()
            } else {
                // normal row, use 2nd position USD
                var prize = tds.eq(1).text().trim().replace(/,/g, '').replace('$', '');
                prevPrize = prize
                text += prize + ','
                // name
                if(tds.length == 3) {
                    // no alternate currency, use last column
                    text += tds.eq(2).text().trim()
                } else {
                    text += tds.eq(3).text().trim()
                }

            }
            text += '\n'
            appendToFile(filename, text)
        });

        done();
    }
});

var links = getLinks(linkfile).filter(x => !!x);
crawler.queue(links)