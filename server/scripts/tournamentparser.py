import pandas as pd

with open("out.sql", 'w') as f:
    df = pd.read_csv("dota2015.csv", header=None, index_col=None)
    df.columns = ["dates", "name", "prize"]

    threshold = 50000
    gameId = "Dota 2"
    city = ""
    country = ""
    region = ""
    for index, row in df.iterrows():
        total_prize = row["prize"].replace(",", "").replace("$", "")
        if float(total_prize) < threshold:
            continue

        name = row["name"].strip()
        dates = row["dates"].strip().split(' - ')
        start_date = end_date = dates[0]
        if len(dates) > 1:
            end_date = dates[1]
        s = f'INSERT INTO Tournament(gameId, name, start_date, end_date, city, country, region, total_prize) VALUES '
        s += f'("{gameId}", "{name}", "{start_date}", "{end_date}", "{city}", "{country}", "{region}", {total_prize})'
        f.write(s)
        f.write('\n')
