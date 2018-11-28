import pandas as pd

with open("dota-team-rankings.sql", 'w', encoding="utf-8") as f:
    df = pd.read_csv("./dota-team-rankings.csv", header=None, index_col=None)
    df.columns = ["tournament", "team", "rank", "prize"]

    tournament = ""

    for index, row in df.iterrows():
        new_tournament = row["tournament"].strip()
        if tournament != new_tournament:
            tournament = new_tournament
            tournamentIdsql = f'SELECT id INTO @tournamentId FROM Tournament WHERE name = "{tournament}";'
            f.write(tournamentIdsql)
            f.write('\n')

        team = row["team"].strip()
        teamIdsql = f'SELECT id INTO @teamId FROM Team WHERE name = "{team}";'
        f.write(teamIdsql)
        f.write('\n')
        rank = row["rank"]
        prize = row["prize"]

        s = f'INSERT INTO TournamentTeamRanking(tournamentId, teamId, teamRank, earning) VALUES '
        s += f'(@tournamentId, @teamId, {rank}, {prize});'
        f.write(s)
        f.write('\n')
