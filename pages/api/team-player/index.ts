import mongoConnection from '../../../database/database-configuration';
import TeamPlayer from '../../../database/models/team-player';
import { getIdsPlayersBots } from '../../../server/player';

const handler = async (req: any, res: any) => {
  try {
    switch (req.method) {
      case 'POST':
        createTeamPlayers(req, res);
        break;
      case 'PUT':
        //TODO: improve condition logic
        req.body.playerOutId ? replacePlayer(req, res) : putTeamPlayers(req, res);
        break;
      case 'DELETE':
        removePlayerFromTeam(req, res);
      default:
        res.status(400).json({ message: 'Unknown method' });
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unexpected error' });
  }
};

const createTeamPlayers = async (req: any, res: any) => {
  try {
    await mongoConnection();
    req.body.map(({ position, isCaptain, player, team }: any) =>
      new TeamPlayer({ position, isCaptain, player, team }).save()
    );
    res.status(201).json({ message: 'Players created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating the Team Player' });
  }
};

const putTeamPlayers = async (req: any, res: any) => {
  try {
    await mongoConnection();

    const { playerOneId, playerTwoId, playerOneTeam, playerTwoTeam } = req.body;

    let team_player1_bd = await TeamPlayer.findOne({
      team: playerOneTeam,
      player: playerOneId,
    });

    let team_player2_bd = await TeamPlayer.findOne({
      team: playerTwoTeam,
      player: playerTwoId,
    });

    if (!team_player1_bd || !team_player2_bd) {
      return res.status(400).json({ message: 'Bad identifier data' });
    }

    const newPlayer1 = {
      _id: team_player1_bd._id,
      position: team_player2_bd.position,
      isCaptain: team_player1_bd.isCaptain,
      player: team_player1_bd.player,
      team: team_player2_bd.team,
    };

    const newPlayer2 = {
      _id: team_player2_bd._id,
      position: team_player1_bd.position,
      isCaptain: team_player2_bd.isCaptain,
      player: team_player2_bd.player,
      team: team_player1_bd.team,
    };

    await TeamPlayer.findOneAndUpdate(
      { team: playerOneTeam, player: playerOneId },
      newPlayer1,
      { new: true }
    );
    await TeamPlayer.findOneAndUpdate(
      { team: playerTwoTeam, player: playerTwoId },
      newPlayer2,
      { new: true }
    );

    return res.status(201).json({ message: 'Players updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating the Team Player' });
  }
};

const replacePlayer = async (req: any, res: any) => {
  try {
    const { playerOutId, playerInId, teamId } = req.body;

    await mongoConnection();

    const teamPlayerDB = await TeamPlayer.findOne({
      team: teamId,
      player: playerOutId,
    });

    if (!teamPlayerDB) {
      return res.status(400).json({ message: 'Bad identifier data' });
    }

    const newPlayer = {
      _id: teamPlayerDB._id,
      position: teamPlayerDB.position,
      isCaptain: teamPlayerDB.isCaptain,
      player: playerInId,
      team: teamPlayerDB.team,
    };

    await TeamPlayer.findOneAndUpdate(
      { team: teamId, player: playerOutId },
      newPlayer
    );

    return res.status(201).json({ message: 'Players updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating the Team Player' });
  }
};

const removePlayerFromTeam = async(req: any, res: any) => {
  try {
    const { idMatch, teamId, idPlayer } = req.body;
    await mongoConnection();

    const matchTeamPlayers = await TeamPlayer.find({ match: idMatch }).lean();
    const matchPlayersIds = matchTeamPlayers.filter(player => player._id).map(player => player.toString());
    const allBots = await getIdsPlayersBots();
    const availableBots = allBots.filter(bot => !matchPlayersIds.includes(bot));

    if(!availableBots || availableBots.length === 0) {
      return res.status(400).json({ message: 'No possible replacement found' });
    }

    const teamPlayerDB = await TeamPlayer.findOne({
      team: teamId,
      player: idPlayer,
    });

    if (!teamPlayerDB) {
      return res.status(400).json({ message: 'Bad identifier data' });
    }

    const replacementPlayer = {
      _id: teamPlayerDB._id,
      position: teamPlayerDB.position,
      isCaptain: teamPlayerDB.isCaptain,
      player: availableBots[0],
      team: teamPlayerDB.team,
    };

    await TeamPlayer.findOneAndUpdate(
      { team: teamId, player: idPlayer },
      replacementPlayer
    );

    return res.status(200).json({ message: 'You left the match successfully' });
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: 'Error on left the match' });
  }
};

export default handler;
