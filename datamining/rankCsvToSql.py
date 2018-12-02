# Convert output from crawler.js to sql format for team rankings.
import pandas as pd

# Change accordingly:
gameId = 1
gameName = "dota2"

fin = "./data/" + gameName + ".csv"
fout = gameName + "-rankings.sql"
with open(fout, 'w', encoding="utf-8") as f:
    df = pd.read_csv(fin, header=0, index_col=None)
    df.columns = ["tournament", "rank", "earning", "team"]
    # columns:
    # tournament, rank, earning, team

    tournament = ""
    count34 = 0
    for index, row in df.iterrows():
        new_tournament = row["tournament"].strip()
        if tournament != new_tournament:
            tournament = new_tournament
            tournamentIdsql = f'SELECT id INTO @tournamentId FROM Tournament WHERE name = "{tournament}" and gameId=2;'
            f.write(tournamentIdsql)
            f.write('\n')

        team = row["team"].strip()
        teamIdsql = f'SELECT id INTO @teamId FROM Team WHERE name = "{team}" and gameId = {gameId};'
        f.write(teamIdsql)
        f.write('\n')
        rank = row["rank"]
        if rank == "1st":
            rank = 1
        elif rank == "2nd":
            rank = 2
        elif rank == "3rd":
            rank = 3
        elif rank == "4th":
            rank = 4
        elif rank == "3rd-4th":
            count34 += 1
            if count34 == 2:
                rank = 4
                count34 = 0
            else:
                rank = 3

        # prize = row["earning"]
        prize = float(row["earning"].replace(
            "$", "").replace(",", "").replace("-", "0"))

        s = f'INSERT INTO TournamentTeamRanking(tournamentId, teamId, teamRank, earning) VALUES '
        s += f'(@tournamentId, @teamId, {rank}, {prize});'
        f.write(s)
        f.write('\n')
