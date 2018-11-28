var Crawler = require("crawler")
var fs = require("fs")

var filename = "data.csv"

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            var tourney = $("title").text().replace(" - Liquipedia Counter-Strike Wiki", "")
            var table = $("tr[class*='place']", "table.prizepooltable")
            // console.log($("table.prizepooltable").text())
            table.each(function(i, elem) {
                place = $(this).text().trim().replace(',', '').replace(/\n+/g, ',')
                text = tourney + ',' + place + '\n'
                fs.appendFileSync(filename, text, (err) => {
                    if (err) throw err;
                });
            });
        }
        done();
    }
});

var links = [
    'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XIII/World_Championship',
    'https://liquipedia.net/counterstrike/FACEIT/2018/Major'
]

c.queue(links);