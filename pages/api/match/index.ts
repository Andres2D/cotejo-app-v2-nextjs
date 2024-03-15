import mongoConnection from '../../../database/database-configuration';
import { Match, Team } from '../../../database/models'; 
import TeamPlayer from '../../../database/models/team-player';

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createMatch(req, res);
        break;
      case 'PUT':
        updateMatch(req, res);
        break;
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

    const matchLength = home_players.length + away_players.length;

    if(matchLength % 2 !== 0) {
      return res.status(400).json({message: 'Invalid players length'});
    }

    const fullPlayers = [...home_players, ...away_players];

    const new_home_players = fullPlayers.slice(0, (matchLength / 2));
    const new_away_players = fullPlayers.slice(matchLength / 2, matchLength);

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
    const homeTeamPlayers = new_home_players.map((player: any) => {
      const playerProfile = {
        ...player,
        position: player.position ?? 'CM'
      }
      return {
        team: homeTeam._id,
        ...playerProfile
      }
    });

    const homeTeamPlayersDB = await createTeamPlayers(homeTeamPlayers);

    if(!homeTeamPlayersDB) {
      throw new Error('Error creating the home team players');
    }

    // Create away team players
    const awayTeamPlayers = new_away_players.map((player: any) => {
      const playerProfile = {
        ...player,
        position: player.position ?? 'CM'
      }
      return {
        team: awayTeam._id,
        ...playerProfile 
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
      away_team: awayTeam._id,
      fullTime: false,
      homeScore: 0,
      awayScore: 0,
    });
    await match.save();
    res.status(201).json({message: 'Match created', match: match._id});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error creating the match'});
  }
}

const updateMatch = async (req: any, res: any) => {
  try {
    const match = req.body;
    if(!match) {
      return null;
    }
    await mongoConnection();

    const matchDB = await Match.findOneAndUpdate({_id: match._id}, match, {new: true});
    return res.status(200).json({message: 'Match updated', match: matchDB});

  } catch (err) {
    console.log(err);
    return null;
  }
};

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
