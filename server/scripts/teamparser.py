import pandas as pd

with open("dota-teams.sql", 'w', encoding="utf-8") as f:
    df = pd.read_csv("./dota-teams.csv", header=None, index_col=None)
    df.columns = ["team", "country", "region"]
    df = df.fillna("")

    for index, row in df.iterrows():
        team = row["team"].strip()
        country = row["country"].strip()
        region = row["region"].strip()

        s = f'INSERT INTO Team(name, country, region) VALUES '
        s += f'("{team}", "{country}", "{region}");'
        f.write(s)
        f.write('\n')
