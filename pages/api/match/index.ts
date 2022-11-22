import mongoConnection from '../../../database/database-configuration';
import { Match } from '../../../database/models'; 

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createMatch(req, res);
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
    const { date, location, home_team, away_team } = req.body;
    await mongoConnection();
    const match = new Match({date, location, home_team, away_team});
    await match.save();
    res.status(201).json({message: 'Match created'});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Error creating the match'});
  }
}

export default handler;
