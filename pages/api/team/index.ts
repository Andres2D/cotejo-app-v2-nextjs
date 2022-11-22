import mongoConnection from '../../../database/database-configuration';
import { Team } from "../../../database/models";

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createTeam(req, res);
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

const createTeam = async(req: any, res: any) => {
  try {
    const {name, formation, shield} = req.body;
    await mongoConnection();
    const team = new Team({name, formation, shield});
    await team.save();
    res.status(201).json({message: 'Team created'});
  }catch(err) {
    res.status(500).json({message: 'Unexpected error'});
  }
};

export default handler;
