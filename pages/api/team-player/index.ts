import mongoConnection from '../../../database/database-configuration';
import TeamPlayer from '../../../database/models/team-player';

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createTeamPlayers(req, res);
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
  
  const createTeamPlayers = async(req: any, res: any) => {
    try {
      await mongoConnection();
      req.body.map(({position, isCaptain, player, team}: any) => 
      new TeamPlayer({position, isCaptain, player, team}).save());
      res.status(201).json({message: 'Players created'});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error creating the Team Player'});
  }
};

export default handler;
