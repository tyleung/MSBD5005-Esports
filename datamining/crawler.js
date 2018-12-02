var Crawler = require('crawler');
var fs = require('fs');

var filename = 'data.csv';

function print(a) {
  console.log(a);
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

      // Iterate over each row
      table.each(function(i, elem) {
        text = tourney + ',';
        numCols = $(this).children('td').length;

        text += rank + ',';
        if (numCols > 1) {
          prizetd = $(this).children('td')[1];
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

        teamtd = $(this).children('td')[numCols - 1];
        team = $(teamtd)
          .text()
          .trim();
        text += team;
        text += '\n';
        rank += 1;
        fs.appendFileSync(filename, text, err => {
          if (err) throw err;
        });
      });
    }
    done();
  }
});

var links = [
  'https://liquipedia.net/dota2/ESL_One/Birmingham/2019',
  'https://liquipedia.net/dota2/DreamLeague/Season_11',
  'https://liquipedia.net/dota2/Chongqing_Major/2019',
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2018',
  'https://liquipedia.net/dota2/PGL/Kuala_Lumpur_Major',
  'https://liquipedia.net/dota2/The_International/2018',
  'https://liquipedia.net/dota2/ESL_One/Katowice/2019',
  'https://liquipedia.net/dota2/Supermajor/2018',
  'https://liquipedia.net/dota2/ESL_One/Birmingham/2018',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/Changsha_Major/2018',
  'https://liquipedia.net/dota2/EPICENTER/2018',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2018',
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2017',
  'https://liquipedia.net/dota2/DreamLeague/Season_8',
  'https://liquipedia.net/dota2/ESL_One/Katowice/2018',
  'https://liquipedia.net/dota2/PGL/Bucharest_Major/2018',
  'https://liquipedia.net/dota2/The_International/2017',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2017',
  'https://liquipedia.net/dota2/Galaxy_Battles/1',
  'https://liquipedia.net/dota2/The_Summit/7',
  'https://liquipedia.net/dota2/EPICENTER/2017',
  'https://liquipedia.net/dota2/ESL_One/Hamburg/2017',
  'https://liquipedia.net/dota2/The_Masters/2017/Manila',
  'https://liquipedia.net/dota2/StarLadder/i-League_Invitational/2',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2017',
  'https://liquipedia.net/dota2/ZOTAC_Cup/Masters',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_3',
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2016',
  'https://liquipedia.net/dota2/ESL_One/Genting/2017',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_5',
  'https://liquipedia.net/dota2/Boston_Major/2016',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2016',
  'https://liquipedia.net/dota2/Northern_Arena/2016/BEAT_Invitational',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2016',
  'https://liquipedia.net/dota2/Kiev_Major/2017',
  'https://liquipedia.net/dota2/The_International/2016',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_2',
  'https://liquipedia.net/dota2/The_Summit/5',
  'https://liquipedia.net/dota2/Nanyang_Dota_2_Championships/Season_2',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2016',
  'https://liquipedia.net/dota2/EPICENTER/2016',
  'https://liquipedia.net/dota2/Manila_Major/2016',
  'https://liquipedia.net/dota2/WePlay_Dota2_League/Season_3',
  'https://liquipedia.net/dota2/StarLadder/i-League_Invitational/1',
  'https://liquipedia.net/dota2/ESL_One/Manila/2016',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_4',
  'https://liquipedia.net/dota2/MarsTV_Dota_2_League/2015/Winter',
  'https://liquipedia.net/dota2/Shanghai_Major/2016',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2015',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_1',
  'https://liquipedia.net/dota2/Game_Show_Global_eSports_Cup/1',
  'https://liquipedia.net/dota2/The_Summit/4',
  'https://liquipedia.net/dota2/Frankfurt_Major/2015',
  'https://liquipedia.net/dota2/Nanyang_Dota_2_Championships/Season_1',
  'https://liquipedia.net/dota2/ESL_One/New_York/2015',
  'https://liquipedia.net/dota2/The_International/2015',
  'https://liquipedia.net/dota2/MLG/2015/World_Finals',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_3',
  'https://liquipedia.net/dota2/Esportal_Dota_2_League',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2015',
  'https://liquipedia.net/dota2/MarsTV_Dota_2_League/2015',
  'https://liquipedia.net/dota2/The_Summit/6',
  'https://liquipedia.net/dota2/JoinDOTA_MLG_Pro_League/Season_2',
  'https://liquipedia.net/dota2/The_Summit/3',
  'https://liquipedia.net/dota2/DreamLeague/Season_3',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_5',
  'https://liquipedia.net/dota2/JoinDOTA_MLG_Pro_League/Season_1',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_12',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_11',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2015',
  'https://liquipedia.net/dota2/I-league/Season_2',
  'https://liquipedia.net/dota2/Dota_2_League/Season_5',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_2',
  'https://liquipedia.net/dota2/Captains_Draft/2',
  'https://liquipedia.net/dota2/DreamLeague/Season_2',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_4',
  'https://liquipedia.net/dota2/National_Electronic_Sports_Tournament_2014',
  'https://liquipedia.net/dota2/The_Summit/2',
  'https://liquipedia.net/dota2/Excellent_Moscow_Cup/Season_2',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_10',
  'https://liquipedia.net/dota2/ESL_One/New_York/2014',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2014',
  'https://liquipedia.net/dota2/I-league/Season_1',
  'https://liquipedia.net/dota2/World_E-sport_Championships_2014',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2014',
  'https://liquipedia.net/dota2/I-league/Season_3',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_3',
  'https://liquipedia.net/dota2/DreamLeague/Season_1',
  'https://liquipedia.net/dota2/Dota_2_League/Western_Challenge',
  'https://liquipedia.net/dota2/WPC_2014',
  'https://liquipedia.net/dota2/The_International/2014',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2014',
  'https://liquipedia.net/dota2/Excellent_Moscow_Cup/Season_1',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_9',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_2',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_3',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_1',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_8',
  'https://liquipedia.net/dota2/G-League_2013',
  'https://liquipedia.net/dota2/Dota_2_League/Season_4',
  'https://liquipedia.net/dota2/2013_WPC_ACE_Dota_2_League',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_2',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Fall/Main_Event',
  'https://liquipedia.net/dota2/ECL_2013/Finals',
  'https://liquipedia.net/dota2/The_Summit/1',
  'https://liquipedia.net/dota2/MLG/2013/Fall_Season/Championship',
  'https://liquipedia.net/dota2/Techlabs_Cup/2013/Finals',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_1',
  'https://liquipedia.net/dota2/DreamLeague/Kick-Off_Season',
  'https://liquipedia.net/dota2/National_Electronic_Sports_Tournament_2013',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_7',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2013',
  'https://liquipedia.net/dota2/WePlay_Dota2_League/Season_2',
  'https://liquipedia.net/dota2/The_Defense/Season_4',
  'https://liquipedia.net/dota2/The_Premier_League/Season_5',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_3',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Summer/Main_Event',
  'https://liquipedia.net/dota2/Alienware_Cup',
  'https://liquipedia.net/dota2/ECL_2013/Season',
  'https://liquipedia.net/dota2/The_International/2013',
  'https://liquipedia.net/dota2/DreamHack/2013/Summer',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_6',
  'https://liquipedia.net/dota2/The_Premier_League/Season_4',
  'https://liquipedia.net/dota2/G-1_Champions_League_Season_5',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_2',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Spring/Main_Event',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_5',
  'https://liquipedia.net/dota2/G-League_2012_Season_2',
  'https://liquipedia.net/dota2/The_Premier_League/Season_3',
  'https://liquipedia.net/dota2/Dota_2_Super_League',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_4',
  'https://liquipedia.net/dota2/The_Defense/Season_3',
  'https://liquipedia.net/dota2/Thor_Open_2012',
  'https://liquipedia.net/dota2/The_Asia_2012',
  'https://liquipedia.net/dota2/World_Cyber_Games_2012',
  'https://liquipedia.net/dota2/DreamHack/2012/Winter',
  'https://liquipedia.net/dota2/G-1_Champions_League_Season_4',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_1',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2012',
  'https://liquipedia.net/dota2/The_International/2012',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_3',
  'https://liquipedia.net/dota2/ProDOTA2_League/Season_1/Pro',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_2',
  'https://liquipedia.net/dota2/The_Premier_League/Season_2',
  'https://liquipedia.net/dota2/DreamHack/2012/Summer',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_1',
  'https://liquipedia.net/dota2/The_Defense/Season_1',
  'https://liquipedia.net/dota2/ASUS_Open_2012',
  'https://liquipedia.net/dota2/The_Premier_League/Season_1',
  'https://liquipedia.net/dota2/Dota2_Star_Championship',
  'https://liquipedia.net/dota2/The_International/2011',
  'https://liquipedia.net/dota2/The_Defense/Season_2',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2011'
];

c.queue(links);
