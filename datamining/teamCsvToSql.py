# Convert output from crawler.js to sql format for teams.
import pandas as pd

# Change accordingly
gameId = 2
gameName = "counterstrike"

fin = "./data/" + gameName + "-teams.csv"
fout = gameName + "-teams.sql"
with open(fin, 'r', encoding="utf-8") as fin, open(fout, 'w', encoding="utf-8") as fout:
    for line in fin:
        #df.columns = ["gameName", "team", "country", "region"]
        line = line.strip("\n").rstrip(",")
        line_split = line.split(",")

        if len(line_split) < 4:
            continue

        team = line_split[1].strip()
        country = line_split[2].strip()
        region = line_split[3].strip()

        s = f'INSERT INTO Team(gameId, name, country, region) VALUES '
        s += f'({gameId}, "{team}", "{country}", "{region}");'
        fout.write(s)
        fout.write('\n')
