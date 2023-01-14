import mongoConnection from '../../../database/database-configuration';
import { Match, Team } from '../../../database/models'; 
import TeamPlayer from '../../../database/models/team-player';

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createMatch(req, res);
        break;
      case 'DELETE':
        deleteMatch(req, res);
        break;
      default:
        res.status(400).json({message: 'Unknown method'});    
        break;
    }
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
};

const createMatch = async(req: any, res: any) => {
  try {
    const { 
      date, 
      location, 
      home_team, 
      away_team, 
      home_players, 
      away_players 
    } = req.body;
    await mongoConnection();

    // Create home team
    const homeTeam = await createTeam(home_team);

    if(!homeTeam) {
      throw new Error('Error creating the home team');
    }

    // Create away team
    const awayTeam = await createTeam(away_team);

    if(!awayTeam) {
      throw new Error('Error creating the away team');
    }

    // Create home team players
    const homeTeamPlayers = home_players.map((player: any) => {
      return {
        team: homeTeam._id,
        ...player
      }
    });

    const homeTeamPlayersDB = await createTeamPlayers(homeTeamPlayers);

    if(!homeTeamPlayersDB) {
      throw new Error('Error creating the home team players');
    }

    // Create away team players
    const awayTeamPlayers = away_players.map((player: any) => {
      return {
        team: awayTeam._id,
        ...player 
      }
    });

    const awayTeamPlayersDB = await createTeamPlayers(awayTeamPlayers);

    if(!awayTeamPlayersDB) {
      throw new Error('Error creating the away team players');
    }

    const match = new Match({
      date, 
      location, 
      home_team: homeTeam._id,
      away_team: awayTeam._id
    });
    await match.save();
    res.status(201).json({message: 'Match created', match: match._id});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error creating the match'});
  }
}

const createTeam = async(team: any) => {
  try {
    const {name, formation, shield} = team;
    const teamDB = new Team({name, formation, shield});
    await teamDB.save();
    return teamDB;
  }catch(err) {
    console.log(err);
    return null;
  }
};

const createTeamPlayers = async(team_player: any) => {
  try {
    team_player.map(({position, isCaptain, player, team}: any) => 
    {
      new TeamPlayer({position, isCaptain, player, team}).save();
    });
    return true;
  }catch(err) {
    console.log(err);
    return null;
  }
};

const deleteMatch = async(req: any, res: any) => {
  console.log(req);
  try {
    const { id } = req.query;
    const match = await Match.findById(id).lean();

    if(!match) {
      return res.status(400).json({
        ok: false,
        msg: "Match doesn't exist"
      });
    }

    const { home_team, away_team } = match;
    
    await Promise.all([
      Match.findByIdAndDelete(id),
      Team.findByIdAndDelete(home_team),
      Team.findByIdAndDelete(away_team),
      TeamPlayer.deleteMany({team: home_team}),
      TeamPlayer.deleteMany({team: away_team}),
    ]);

    return res.json({
      ok: true,
      msg: `Match ${id} deleted`
    });
  }catch(err) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected error'
    });
  }
};

export default handler;
