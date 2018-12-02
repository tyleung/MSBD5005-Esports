t = document.querySelector('table.prizepooltable');
rows = t.querySelectorAll('tr');

function crawl() {
  game = document.title.replace(' - Liquipedia Dota 2 Wiki', '');
  ret = '';
  
  rank = 1;
  prevPrize = 0;
  for (var i = 1; i < rows.length; i++) {
    row = rows[i];
    if (row.firstChild.className === 'prizepooltabletoggle') {
      continue;
    }
    
    ret += game;
    team = row.children[row.children.length - 1].innerText.trim();
    ret += ',' + team;
    ret += ',' + rank;
    if (row.children.length > 1) {
      prize = parseFloat(row.children[1].innerText.replace('$', '').replace(/,/g,'').trim()) || 0;
      prevPrize = prize
      ret += ',' + prize;
    } else {
      ret += ',' + prevPrize;
    }
    
    ret += '\n'
    rank += 1
  }

  return ret;
}

console.log(crawl())
