-- CREATING TABLES

-- Foreign key dependant tables here
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS Tournament;
DROP TABLE IF EXISTS PrizePool;
DROP TABLE IF EXISTS TournamentTeamRanking;

CREATE TABLE User(
    username VARCHAR(100),   -- user alias, either docAlias or patAlias
    salt     VARCHAR(64),
    hash     VARCHAR(64),
    role     CHAR(1),        -- 0 for doctor, 1 for patient
    PRIMARY KEY(username)
);

CREATE TABLE Game(
    id      INTEGER NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE Team(
    id      INTEGER NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100),
    country VARCHAR(100),
    region  VARCHAR(100)
    PRIMARY KEY(id)
);

CREATE TABLE Tournament(
    id          INTEGER NOT NULL AUTO_INCREMENT,
    gameId      INTEGER,
    name        VARCHAR(100),
    startDate   DATETIME,
    endDate     DATETIME,
    city        VARCHAR(100),
    country     VARCHAR(100),
    region      VARCHAR(100)

    PRIMARY KEY(id),
    FOREIGN KEY(gameId) REFERENCES Game(id)
);

CREATE TABLE PrizePool(
    id              INTEGER NOT NULL AUTO_INCREMENT,
    amount          FLOAT,
    tournamentId    INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(tournamentId) REFERENCES Tournament(id)
);

CREATE TABLE TournamentTeamRanking(
    tournamentId    INTEGER,
    teamId          INTEGER,
    teamRank        INTEGER,
    earning         FLOAT,
    PRIMARY KEY(tournamentId, teamId, teamRank),
    FOREIGN KEY(tournamentId) REFERENCES Tournament(id),
    FOREIGN KEY(teamId) REFERENCES Team(id)
);