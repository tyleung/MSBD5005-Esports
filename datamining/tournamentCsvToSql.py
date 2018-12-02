# Convert output from tourney.js to sql format for tournaments.
import pandas as pd
import datetime
import calendar

# Change gameId and gameName accordingly
gameId = 1
gameName = "dota2"

threshold = 50000


def parseDates(dates):
    dates = dates.split("-")
    year = int(line_split[2].strip())
    start_date_str = dates[0].strip()
    start_month_abbr, start_day = start_date_str.split()
    start_month = list(calendar.month_abbr).index(start_month_abbr)
    start_date = datetime.datetime(
        year, start_month, int(start_day)).date()
    end_date = start_date
    if len(dates) > 1:
        end_date_str = dates[1].strip()
        if end_date_str.isdigit():
            end_day = int(end_date_str)
            end_date = datetime.datetime(year, start_month, end_day).date()
        else:
            end_month_abbr, end_day = end_date_str.split()
            end_month = list(calendar.month_abbr).index(end_month_abbr)
            end_date = datetime.datetime(
                year, end_month, int(end_day)).date()
    return start_date, end_date


in_file = "./data/" + gameName + "-tournaments.csv"
out_file = gameName + "-tournaments.sql"
with open(in_file, 'r', encoding="utf-8") as fin, open(out_file, 'w', encoding="utf-8") as fout:
    for line in fin:
        # df.columns = ["tournament", "dates", "year", "prize_pool", "num_teams", "city", "country"]
        line = line.strip("\n").rstrip(",")
        line_split = line.split(",")
        tournament = line_split[0].strip()
        dates = line_split[1].strip()
        start_date, end_date = parseDates(dates)
        prize_pool = line_split[3].strip()
        # num_teams = line_split[4].strip()
        city = line_split[5].strip()
        country = line_split[-1].strip()
        region = ""

        s = f'INSERT INTO Tournament(gameId, name, startDate, endDate, city, country, region, prizePool) VALUES '
        s += f'({gameId}, "{tournament}", "{start_date}", "{end_date}", "{city}", "{country}", "{region}", {prize_pool});'
        fout.write(s)
        fout.write('\n')
