using CricketService.Data.Contexts;
using CricketService.Data.Extensions;
using CricketService.Data.Repositories.Extensions;
using CricketService.Data.Repositories.Interfaces;
using CricketService.Domain;
using CricketService.Domain.Enums;
using Microsoft.Extensions.Logging;

namespace CricketService.Data.Repositories
{
    public class CricketTeamRepository : ICricketTeamRepository
    {
        private ILogger<CricketPlayerRepository> logger;
        private CricketServiceContext context;

        public CricketTeamRepository(ILogger<CricketPlayerRepository> logger, CricketServiceContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        public IEnumerable<Team> GetAllTeamDetails()
        {
            return context.CricketTeamInfo
                 .Select(x => new Team(
                     x.Uuid,
                     x.TeamName,
                     x.Formats,
                     x.LogoUrl,
                     x.FlagUrl));
        }

        public IEnumerable<string> GetAllTeamNames(CricketFormat format)
        {
            List<string> teams = new();

            if (format == CricketFormat.All)
            {
                teams = context.CricketTeamInfo.AsEnumerable()
                  .Select(x => x.TeamName)
                  .OrderBy(x => x).ToList();
            }
            else
            {
                teams = context.CricketTeamInfo.AsEnumerable()
                 .Where(x => x.Formats.Contains(format.ToString()))
                 .Select(x => x.TeamName)
                 .OrderBy(x => x).ToList();
            }

            return teams;
        }

        public CricketTeamInfoResponse GetTeamRecordsByName(string teamName, bool isSingle = false)
        {
            var cricketMatchInfoTableODI = context.ODICricketMatchInfo;
            var cricketMatchInfoTableT20I = context.T20ICricketMatchInfo;
            var cricketTeamInfoTable = context.CricketTeamInfo;

            var allMatchesByTeamODI = cricketMatchInfoTableODI.Where(x => x.Team1.TeamName == teamName || x.Team2.TeamName == teamName);
            var allMatchesByTeamT20I = cricketMatchInfoTableT20I.Where(x => x.Team1.TeamName == teamName || x.Team2.TeamName == teamName);

            Entities.CricketTeamInfo teamInfo = null!;

            try
            {
                teamInfo = cricketTeamInfoTable.Single(t => t.TeamName == teamName);
            }
            catch
            {
                throw new Exception($"{teamName} does not exists.");
            }

            CricketTeamInfoResponse teamRecordData = new CricketTeamInfoResponse(
                teamInfo.Uuid,
                teamName,
                new TeamRecordDetails(null!, null!, null!),
                teamInfo.FlagUrl);

            if (allMatchesByTeamT20I.Any())
            {
                DebutDetails debutDetails = null!;
                TeamMileStones teamMileStones = null!;

                if (isSingle)
                {
                    var debutMatchDetails = allMatchesByTeamT20I
                                    .OrderBy(x => Convert.ToInt32(x.MatchNo.Replace("T20I no. ", string.Empty))).First();

                    var debutOpponent = debutMatchDetails.Team1.TeamName == teamName ? debutMatchDetails.Team2.TeamName : debutMatchDetails.Team1.TeamName;

                    var cricketMatchInfoResponses = allMatchesByTeamT20I.Select(x => x.ToDomain());

                    teamMileStones = cricketMatchInfoResponses.GetMileStones(teamName);

                    debutDetails = new DebutDetails(
                                                   debutMatchDetails.Uuid,
                                                   Convert.ToDateTime(debutMatchDetails.MatchDate),
                                                   debutOpponent,
                                                   debutMatchDetails.Venue,
                                                   debutMatchDetails.Result,
                                                   debutMatchDetails.MatchNo);
                }

                teamRecordData.TeamRecordDetails.T20IResults = new TeamResultDetails(
                                           debut: debutDetails,
                                           matches: cricketMatchInfoTableT20I.Count(m => m.Team1.TeamName == teamName || m.Team2.TeamName == teamName),
                                           won: cricketMatchInfoTableT20I.Count(m => m.Result.Contains($"{teamName} won by")),
                                           lost: cricketMatchInfoTableT20I.Count(m => (m.Team1.TeamName == teamName && m.Result.Contains(m.Team2.TeamName + " won by"))
                                                 || (m.Team2.TeamName == teamName && m.Result.Contains(m.Team1.TeamName + " won by"))),
                                           tiedAndWon: cricketMatchInfoTableT20I.Count(m => m.Result.Contains($"Match tied ({teamName} won the one-over eliminator)")),
                                           tiedAndLost: cricketMatchInfoTableT20I.Count(m => (m.Team1.TeamName == teamName || m.Team2.TeamName == teamName)
                                                 && m.Result.Contains("Match tied")
                                                 && !m.Result.Contains($"Match tied ({teamName} won the one-over eliminator)")),
                                           noResult: cricketMatchInfoTableT20I.Count(m => (m.Team1.TeamName == teamName || m.Team2.TeamName == teamName)
                                                 && m.Result.Contains("No result")),
                                           teamMileStones: teamMileStones);
            }

            if (allMatchesByTeamODI.Any())
            {
                DebutDetails debutDetails = null!;
                TeamMileStones teamMileStones = null!;

                if (isSingle)
                {
                    var debutMatchDetails = allMatchesByTeamODI
                    .OrderBy(x => Convert.ToInt32(x.MatchNo.Replace("ODI no. ", string.Empty))).First();

                    var debutOpponent = debutMatchDetails.Team1.TeamName == teamName ? debutMatchDetails.Team2.TeamName : debutMatchDetails.Team1.TeamName;

                    var cricketMatchInfoResponses = allMatchesByTeamODI.Select(x => x.ToDomain());

                    teamMileStones = cricketMatchInfoResponses.GetMileStones(teamName);

                    debutDetails = new DebutDetails(
                                                   debutMatchDetails.Uuid,
                                                   Convert.ToDateTime(debutMatchDetails.MatchDate),
                                                   debutOpponent,
                                                   debutMatchDetails.Venue,
                                                   debutMatchDetails.Result,
                                                   debutMatchDetails.MatchNo);
                }

                teamRecordData.TeamRecordDetails.ODIResults = new TeamResultDetails(
                                           debut: debutDetails,
                                           matches: cricketMatchInfoTableODI.Count(m => m.Team1.TeamName == teamName || m.Team2.TeamName == teamName),
                                           won: cricketMatchInfoTableODI.Count(m => m.Result.Contains($"{teamName} won by")),
                                           lost: cricketMatchInfoTableODI.Count(m => (m.Team1.TeamName == teamName && m.Result.Contains(m.Team2.TeamName + " won by"))
                                                 || (m.Team2.TeamName == teamName && m.Result.Contains(m.Team1.TeamName + " won by"))),
                                           tiedAndWon: cricketMatchInfoTableODI.Count(m => m.Result.Contains($"Match tied ({teamName} won the one-over eliminator)")),
                                           tiedAndLost: cricketMatchInfoTableODI.Count(m => (m.Team1.TeamName == teamName || m.Team2.TeamName == teamName)
                                                 && m.Result.Contains("Match tied")
                                                 && !m.Result.Contains($"Match tied ({teamName} won the one-over eliminator)")),
                                           noResult: cricketMatchInfoTableODI.Count(m => (m.Team1.TeamName == teamName || m.Team2.TeamName == teamName)
                                                 && m.Result.Contains("No result")),
                                           teamMileStones: teamMileStones);
            }

            return teamRecordData;
        }

        public object GetAllAgainstRecordsByNameT20I(string teamName)
        {
            var cricketMatchInfoTableT20I = context.T20ICricketMatchInfo;

            var allMatchesByTeamT20I = cricketMatchInfoTableT20I.Where(x => x.Team1.TeamName == teamName || x.Team2.TeamName == teamName);

            var recordAgainstTeams = allMatchesByTeamT20I
                 .GroupBy(m => m.Team1.TeamName == teamName ? m.Team2.TeamName : m.Team1.TeamName);

            return recordAgainstTeams.Select(g => new
            {
                Opponent = g.Key,
                Matches = g.Count(),
                Won = g.Count(x => x.Result.Contains($"{teamName} won by")),
                Lost = g.Count(m => (m.Team1.TeamName == teamName && m.Result.Contains(m.Team2.TeamName + " won by"))
                                                 || (m.Team2.TeamName == teamName && m.Result.Contains(m.Team1.TeamName + " won by"))),
                NoResult = g.Count(x => x.Result.Contains("No result")),
            });
        }

        public object GetAllAgainstRecordsByNameODI(string teamName)
        {
            var cricketMatchInfoTableODI = context.ODICricketMatchInfo;

            var allMatchesByTeamODI = cricketMatchInfoTableODI.Where(x => x.Team1.TeamName == teamName || x.Team2.TeamName == teamName);

            var recordAgainstTeams = allMatchesByTeamODI
                 .GroupBy(m => m.Team1.TeamName == teamName ? m.Team2.TeamName : m.Team1.TeamName);

            return recordAgainstTeams.Select(g => new
            {
                Opponent = g.Key,
                Matches = g.Count(),
                Won = g.Count(x => x.Result.Contains($"{teamName} won by")),
                Lost = g.Count(m => (m.Team1.TeamName == teamName && m.Result.Contains(m.Team2.TeamName + " won by"))
                                                 || (m.Team2.TeamName == teamName && m.Result.Contains(m.Team1.TeamName + " won by"))),
                NoResult = g.Count(x => x.Result.Contains("No result")),
            });
        }

        public CricketTeamInfoResponse GetTeamByUuid(Guid teamUuid)
        {
            var team = context.CricketTeamInfo.Single(x => x.Uuid == teamUuid);

            return GetTeamRecordsByName(team.TeamName, true);
        }
    }
}