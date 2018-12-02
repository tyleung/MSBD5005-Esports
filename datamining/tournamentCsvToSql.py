# Convert output from tourney.js to sql format for tournaments.
import pandas as pd

# Change accordingly
data_file = "./data/overwatch.csv"
gameId = 3  # overwatch
threshold = 50000

with open("tournament-out.sql", 'w', encoding="utf-8") as f:
    df = pd.read_csv(data_file, header=0, index_col=None)
    # columns:
    # gameId,name,start_date,end_date,city,country,region,total_prize

    for index, row in df.iterrows():
        total_prize = row["total_prize"]
        if float(total_prize) < threshold:
            continue

        name = row["name"].strip()
        start_date = row["start_date"].strip()
        end_date = row["end_date"].strip()
        city = row["city"].strip()
        country = row["country"].strip()
        region = row["region"].strip()

        s = f'INSERT INTO Tournament(gameId, name, startDate, endDate, city, country, region, prizePool) VALUES '
        s += f'({gameId}, "{name}", "{start_date}", "{end_date}", "{city}", "{country}", "{region}", {total_prize});'
        f.write(s)
        f.write('\n')
