# Convert output from crawler.js to sql format for teams.
import pandas as pd

# Change accordingly
gameId = 1
gameName = "dota2"

fin = "./data/" + gameName + ".csv"
fout = gameName + "-teams.sql"
with open(fout, 'w', encoding="utf-8") as f:
    df = pd.read_csv(fin, header=0, index_col=None)
    df.columns = ["tournament", "rank", "earning", "team"]

    teams = [team.strip() for team in df["team"].values]
    teams = set(teams)

    for team in teams:
        #team = row["team"].strip()
        #country = row["country"].strip()
        #region = row["region"].strip()
        country = ""
        region = ""

        s = f'INSERT INTO Team(gameId, name, country, region) VALUES '
        s += f'({gameId}, "{team}", "{country}", "{region}");'
        f.write(s)
        f.write('\n')