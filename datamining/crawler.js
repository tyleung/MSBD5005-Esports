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
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2018',
  'https://liquipedia.net/dota2/ESL_One/Katowice/2019',
  'https://liquipedia.net/dota2/Chongqing_Major/2019',
  'https://liquipedia.net/dota2/PGL/Kuala_Lumpur_Major',
  'https://liquipedia.net/dota2/The_International/2018',
  'https://liquipedia.net/dota2/Supermajor/2018',
  'https://liquipedia.net/dota2/ESL_One/Birmingham/2018',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/Changsha_Major/2018',
  'https://liquipedia.net/dota2/EPICENTER/2018',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2018',
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2017',
  'https://liquipedia.net/dota2/DreamLeague/Season_8',
  'https://liquipedia.net/dota2/PGL/Bucharest_Major/2018',
  'https://liquipedia.net/dota2/ESL_One/Hamburg/2017',
  'https://liquipedia.net/dota2/ESL_One/Katowice/2018',
  'https://liquipedia.net/dota2/The_Summit/7',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2017',
  'https://liquipedia.net/dota2/EPICENTER/2017',
  'https://liquipedia.net/dota2/Galaxy_Battles/1',
  'https://liquipedia.net/dota2/ZOTAC_Cup/Masters',
  'https://liquipedia.net/dota2/The_Masters/2017/Manila',
  'https://liquipedia.net/dota2/StarLadder/i-League_Invitational/2',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2017',
  'https://liquipedia.net/dota2/Kiev_Major/2017',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_3',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_5',
  'https://liquipedia.net/dota2/World_Electronic_Sports_Games/2016',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2016',
  'https://liquipedia.net/dota2/ESL_One/Genting/2017',
  'https://liquipedia.net/dota2/The_International/2017',
  'https://liquipedia.net/dota2/Northern_Arena/2016/BEAT_Invitational',
  'https://liquipedia.net/dota2/The_Summit/6',
  'https://liquipedia.net/dota2/The_International/2016',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2016',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_2',
  'https://liquipedia.net/dota2/Nanyang_Dota_2_Championships/Season_2',
  'https://liquipedia.net/dota2/The_Summit/5',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2016',
  'https://liquipedia.net/dota2/EPICENTER/2016',
  'https://liquipedia.net/dota2/Manila_Major/2016',
  'https://liquipedia.net/dota2/WePlay_Dota2_League/Season_3',
  'https://liquipedia.net/dota2/StarLadder/i-League_Invitational/1',
  'https://liquipedia.net/dota2/Boston_Major/2016',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_4',
  'https://liquipedia.net/dota2/MarsTV_Dota_2_League/2015/Winter',
  'https://liquipedia.net/dota2/StarLadder/i-League_StarSeries/Season_1',
  'https://liquipedia.net/dota2/Shanghai_Major/2016',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2015',
  'https://liquipedia.net/dota2/ESL_One/Manila/2016',
  'https://liquipedia.net/dota2/The_Summit/4',
  'https://liquipedia.net/dota2/Game_Show_Global_eSports_Cup/1',
  'https://liquipedia.net/dota2/Nanyang_Dota_2_Championships/Season_1',
  'https://liquipedia.net/dota2/ESL_One/New_York/2015',
  'https://liquipedia.net/dota2/The_International/2015',
  'https://liquipedia.net/dota2/MLG/2015/World_Finals',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_3',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2015',
  'https://liquipedia.net/dota2/Esportal_Dota_2_League',
  'https://liquipedia.net/dota2/MarsTV_Dota_2_League/2015',
  'https://liquipedia.net/dota2/JoinDOTA_MLG_Pro_League/Season_2',
  'https://liquipedia.net/dota2/I-league/Season_3',
  'https://liquipedia.net/dota2/Frankfurt_Major/2015',
  'https://liquipedia.net/dota2/The_Summit/3',
  'https://liquipedia.net/dota2/DreamLeague/Season_3',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_5',
  'https://liquipedia.net/dota2/Dota_2_Asia_Championships/2015',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_12',
  'https://liquipedia.net/dota2/JoinDOTA_MLG_Pro_League/Season_1',
  'https://liquipedia.net/dota2/Dota_2_League/Season_5',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_11',
  'https://liquipedia.net/dota2/Dota_Pit_League/Season_2',
  'https://liquipedia.net/dota2/Captains_Draft/2',
  'https://liquipedia.net/dota2/I-league/Season_2',
  'https://liquipedia.net/dota2/DreamLeague/Season_2',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_4',
  'https://liquipedia.net/dota2/National_Electronic_Sports_Tournament_2014',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_10',
  'https://liquipedia.net/dota2/The_Summit/2',
  'https://liquipedia.net/dota2/Excellent_Moscow_Cup/Season_2',
  'https://liquipedia.net/dota2/I-league/Season_1',
  'https://liquipedia.net/dota2/World_Cyber_Arena/2014',
  'https://liquipedia.net/dota2/World_E-sport_Championships_2014',
  'https://liquipedia.net/dota2/ESL_One/Frankfurt/2014',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_3',
  'https://liquipedia.net/dota2/The_International/2014',
  'https://liquipedia.net/dota2/Dota_2_League/Western_Challenge',
  'https://liquipedia.net/dota2/The_Summit/1',
  'https://liquipedia.net/dota2/DreamLeague/Season_1',
  'https://liquipedia.net/dota2/Mars_Dota_2_League/2014',
  'https://liquipedia.net/dota2/ESL_One/New_York/2014',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_9',
  'https://liquipedia.net/dota2/Excellent_Moscow_Cup/Season_1',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_2',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_8',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_3',
  'https://liquipedia.net/dota2/G-League_2013',
  'https://liquipedia.net/dota2/Dota_2_Champions_League/Season_1',
  'https://liquipedia.net/dota2/Dota_2_League/Season_4',
  'https://liquipedia.net/dota2/2013_WPC_ACE_Dota_2_League',
  'https://liquipedia.net/dota2/WPC_2014',
  'https://liquipedia.net/dota2/ECL_2013/Finals',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Fall/Main_Event',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_2',
  'https://liquipedia.net/dota2/Techlabs_Cup/2013/Finals',
  'https://liquipedia.net/dota2/MLG/2013/Fall_Season/Championship',
  'https://liquipedia.net/dota2/DreamLeague/Kick-Off_Season',
  'https://liquipedia.net/dota2/Nexon_Sponsorship_League/Season_1',
  'https://liquipedia.net/dota2/National_Electronic_Sports_Tournament_2013',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2013',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_7',
  'https://liquipedia.net/dota2/WePlay_Dota2_League/Season_2',
  'https://liquipedia.net/dota2/The_Premier_League/Season_5',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_3',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Summer/Main_Event',
  'https://liquipedia.net/dota2/The_International/2013',
  'https://liquipedia.net/dota2/The_Defense/Season_4',
  'https://liquipedia.net/dota2/ECL_2013/Season',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_6',
  'https://liquipedia.net/dota2/DreamHack/2013/Summer',
  'https://liquipedia.net/dota2/G-1_Champions_League_Season_5',
  'https://liquipedia.net/dota2/Dota_2_Super_League',
  'https://liquipedia.net/dota2/The_Premier_League/Season_4',
  'https://liquipedia.net/dota2/ESL_Major_Series_One/Spring/Main_Event',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_2',
  'https://liquipedia.net/dota2/The_Defense/Season_3',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_5',
  'https://liquipedia.net/dota2/G-League_2012_Season_2',
  'https://liquipedia.net/dota2/The_Premier_League/Season_3',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_4',
  'https://liquipedia.net/dota2/ASUS_Open_2012',
  'https://liquipedia.net/dota2/The_Asia_2012',
  'https://liquipedia.net/dota2/Thor_Open_2012',
  'https://liquipedia.net/dota2/World_Cyber_Games_2012',
  'https://liquipedia.net/dota2/G-1_Champions_League_Season_4',
  'https://liquipedia.net/dota2/DreamHack/2012/Winter',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2012',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_3',
  'https://liquipedia.net/dota2/RaidCall_Dota_2_League_Season_1',
  'https://liquipedia.net/dota2/Alienware_Cup',
  'https://liquipedia.net/dota2/The_International/2012',
  'https://liquipedia.net/dota2/ProDOTA2_League/Season_1/Pro',
  'https://liquipedia.net/dota2/The_Premier_League/Season_2',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_2',
  'https://liquipedia.net/dota2/DreamHack/2012/Summer',
  'https://liquipedia.net/dota2/The_Premier_League/Season_1',
  'https://liquipedia.net/dota2/StarLadder/StarSeries/Season_1',
  'https://liquipedia.net/dota2/The_Defense/Season_2',
  'https://liquipedia.net/dota2/Dota2_Star_Championship',
  'https://liquipedia.net/dota2/Electronic_Sports_World_Cup_2011',
  'https://liquipedia.net/dota2/The_Defense/Season_1',
  'https://liquipedia.net/dota2/The_International/2011',
  'https://liquipedia.net/counterstrike/ESL/One/2019/Cologne',
  'https://liquipedia.net/counterstrike/DreamHack/2019/Dallas',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XIV/Sydney',
  'https://liquipedia.net/counterstrike/StarSeries_i-League/Season_7',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XIII/World_Championship',
  'https://liquipedia.net/counterstrike/World_Electronic_Sports_Games/2018',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_8/Finals',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_6',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_8/North_America',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_8/Europe',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XIII/Chicago',
  'https://liquipedia.net/counterstrike/EPICENTER/2018',
  'https://liquipedia.net/counterstrike/StarSeries_i-League/Season_6',
  'https://liquipedia.net/counterstrike/ESL/One/2018/New_York',
  'https://liquipedia.net/counterstrike/FACEIT/2018/Major',
  'https://liquipedia.net/counterstrike/DreamHack/2018/Stockholm',
  'https://liquipedia.net/counterstrike/ELEAGUE/2018/Premier',
  'https://liquipedia.net/counterstrike/ESL/One/2018/Cologne',
  'https://liquipedia.net/counterstrike/ESL/One/2018/Belo_Horizonte',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_5',
  'https://liquipedia.net/counterstrike/StarSeries_i-League/Season_5',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_7/Finals',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XIII/Sydney',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_7/North_America',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_7/Europe',
  'https://liquipedia.net/counterstrike/DreamHack/2018/Marseille',
  'https://liquipedia.net/counterstrike/World_Electronic_Sports_Games/2017',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XII/World_Championship',
  'https://liquipedia.net/counterstrike/StarLadder_i-League/StarSeries/Season_4',
  'https://liquipedia.net/counterstrike/ELEAGUE/2018/Major',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_4',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_6/Finals',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XII/Oakland',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_6/Europe',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_6/North_America',
  'https://liquipedia.net/counterstrike/EPICENTER/2017',
  'https://liquipedia.net/counterstrike/ELEAGUE/2017/Premier',
  'https://liquipedia.net/counterstrike/DreamHack/2017/Malm%C3%B6',
  'https://liquipedia.net/counterstrike/PGL/2017/Krakow',
  'https://liquipedia.net/counterstrike/ESL/One/2017/Cologne',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_3',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_5/Finals',
  'https://liquipedia.net/counterstrike/ESL/One/2017/New_York',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_5/Europe',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_5/North_America',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XII/Sydney',
  'https://liquipedia.net/counterstrike/StarLadder_i-League/StarSeries/Season_3',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XI/World_Championship',
  'https://liquipedia.net/counterstrike/DreamHack/2017/Las_Vegas',
  'https://liquipedia.net/counterstrike/World_Electronic_Sports_Games/2016',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_2',
  'https://liquipedia.net/counterstrike/ELEAGUE/Season_2',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_XI/Oakland',
  'https://liquipedia.net/counterstrike/DreamHack/2016/Winter',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_4/Finals',
  'https://liquipedia.net/counterstrike/ESG_Tour/2017/Mykonos',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_4/Europe',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_4/North_America',
  'https://liquipedia.net/counterstrike/EPICENTER/2016',
  'https://liquipedia.net/counterstrike/ESL/One/2016/New_York',
  'https://liquipedia.net/counterstrike/DreamHack/2016/Bucharest',
  'https://liquipedia.net/counterstrike/StarLadder_i-League/StarSeries/Season_2',
  'https://liquipedia.net/counterstrike/ELEAGUE/Season_1',
  'https://liquipedia.net/counterstrike/ESL/One/2016/Cologne',
  'https://liquipedia.net/counterstrike/Esports_Championship_Series/Season_1',
  'https://liquipedia.net/counterstrike/StarLadder_i-League/Invitational/1',
  'https://liquipedia.net/counterstrike/DreamHack/2016/Summer',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_3/Finals',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_3/North_America',
  'https://liquipedia.net/counterstrike/ELEAGUE/2017/Major',
  'https://liquipedia.net/counterstrike/DreamHack/2016/Malm%C3%B6',
  'https://liquipedia.net/counterstrike/ESL/Pro_League/Season_3/Europe',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_X/World_Championship',
  'https://liquipedia.net/counterstrike/CEVO/Season_9/Professional',
  'https://liquipedia.net/counterstrike/Game_Show/Global_eSports_Cup/Season_1',
  'https://liquipedia.net/counterstrike/StarLadder/i-League_StarSeries/XIV',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_2/Finals',
  'https://liquipedia.net/counterstrike/DreamHack/2016/Leipzig',
  'https://liquipedia.net/counterstrike/Fragbite_Masters/Season_5',
  'https://liquipedia.net/counterstrike/FACEIT/League/2015/Stage_3/Finals',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_X/San_Jose',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_2/North_America',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_2/Europe',
  'https://liquipedia.net/counterstrike/IBUYPOWER/Cup',
  'https://liquipedia.net/counterstrike/CEVO/Season_8/Professional',
  'https://liquipedia.net/counterstrike/MLG/2016/Columbus',
  'https://liquipedia.net/counterstrike/E-Frag/The_World_Championships/2015',
  'https://liquipedia.net/counterstrike/CS:GO_Championship_Series/Season_1/Finals',
  'https://liquipedia.net/counterstrike/Gfinity/Champion_of_Champions',
  'https://liquipedia.net/counterstrike/DreamHack/2015/London',
  'https://liquipedia.net/counterstrike/DreamHack/2015/Cluj-Napoca',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_X/gamescom',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Invitational',
  'https://liquipedia.net/counterstrike/CEVO/Season_7/Professional',
  'https://liquipedia.net/counterstrike/FACEIT/League/2015/Stage_2/Finals',
  'https://liquipedia.net/counterstrike/Electronic_Sports_World_Cup/2015',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_1/Finals',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_1/Europe',
  'https://liquipedia.net/counterstrike/Gfinity/Masters/Summer_1',
  'https://liquipedia.net/counterstrike/ESL_ESEA/Pro_League/Season_1/North_America',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/XIII',
  'https://liquipedia.net/counterstrike/DreamHack/2015/Summer',
  'https://liquipedia.net/counterstrike/Fragbite_Masters/Season_4',
  'https://liquipedia.net/counterstrike/Gfinity/Masters/Spring_2',
  'https://liquipedia.net/counterstrike/FACEIT/League/Finals/2015',
  'https://liquipedia.net/counterstrike/DreamHack/2015/Tours',
  'https://liquipedia.net/counterstrike/CS:GO_Championship_Series/Kick-off_Season',
  'https://liquipedia.net/counterstrike/ESL/One/2015/Cologne',
  'https://liquipedia.net/counterstrike/ESEA/Season_18/Invite',
  'https://liquipedia.net/counterstrike/Gfinity/Spring_Masters_1',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/XII',
  'https://liquipedia.net/counterstrike/MLG/Aspen_Invitational',
  'https://liquipedia.net/counterstrike/ESL/League/Pro/I',
  'https://liquipedia.net/counterstrike/ESEA/Season_17/Invite',
  'https://liquipedia.net/counterstrike/Fragbite_Masters/Season_3',
  'https://liquipedia.net/counterstrike/ESL/One/2015/Katowice',
  'https://liquipedia.net/counterstrike/Electronic_Sports_World_Cup/2014',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/XI',
  'https://liquipedia.net/counterstrike/FACEIT/League/Season_2',
  'https://liquipedia.net/counterstrike/DreamHack/2014/Invitational_II',
  'https://liquipedia.net/counterstrike/DreamHack/2014/Winter',
  'https://liquipedia.net/counterstrike/ESL/One/2014/Cologne',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/X',
  'https://liquipedia.net/counterstrike/ESEA/Season_16/Invite',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/IX',
  'https://liquipedia.net/counterstrike/DreamHack/2014/Summer',
  'https://liquipedia.net/counterstrike/Fragbite_Masters/Season_2',
  'https://liquipedia.net/counterstrike/ESL/Major_Series_One/2014/Katowice',
  'https://liquipedia.net/counterstrike/Fragbite_Masters/Season_1',
  'https://liquipedia.net/counterstrike/ESEA/Season_15/Invite',
  'https://liquipedia.net/counterstrike/Gfinity/G3',
  'https://liquipedia.net/counterstrike/Electronic_Sports_World_Cup/2013',
  'https://liquipedia.net/counterstrike/ESL_Major_Series_One/Fall/Main_Event',
  'https://liquipedia.net/counterstrike/StarLadder/StarSeries/VII',
  'https://liquipedia.net/counterstrike/ESEA/Season_14/Invite',
  'https://liquipedia.net/counterstrike/DreamHack/2013/Bucharest',
  'https://liquipedia.net/counterstrike/ESL/Major_Series_One/Summer_2013',
  'https://liquipedia.net/counterstrike/DreamHack/2013/Summer',
  'https://liquipedia.net/counterstrike/ESL_Major_Series_One/Spring/Main_Event',
  'https://liquipedia.net/counterstrike/ESEA/Season_13/Invite',
  'https://liquipedia.net/counterstrike/DreamHack/2012/Winter',
  'https://liquipedia.net/counterstrike/ESEA/Season_12/Invite',
  'https://liquipedia.net/counterstrike/Electronic_Sports_World_Cup/2012',
  'https://liquipedia.net/counterstrike/DreamHack/2013/Winter',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_VI/World_Championship',
  'https://liquipedia.net/counterstrike/Intel_Extreme_Masters/Season_VI/Global_Challenge_Kiev',
  'https://liquipedia.net/counterstrike/DreamHack/2012/Summer'
];

c.queue(links);
