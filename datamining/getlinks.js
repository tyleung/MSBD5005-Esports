var Crawler = require("crawler")
var fs = require("fs")

var cl = new Crawler({
    maxConnections: 10,
    callback: function(err, res, done) {
        if(err) {
            console.log(err);
        } else {
            var $ = res.$;
            var tourney = $("div.tournament-card")

            tourney.each(function(i, elem) {
                var rows = $(this).children('.divRow')
                rows.each(function(i, elem) {
                    var first = $(this).children('.Tournament')
                    
                    link = '"https://liquipedia.net' + $('b', first).children().attr('href') + '",\n'
                    fs.appendFile('link.txt', link, (err) => {
                        if (err) throw err;
                    });
                });
            });
        }
        done()
    }
})

cl.queue(['https://liquipedia.net/dota2/Premier_Tournaments'])