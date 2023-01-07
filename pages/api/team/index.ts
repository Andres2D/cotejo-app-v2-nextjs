import mongoConnection from '../../../database/database-configuration';
import { Team } from "../../../database/models";

const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'POST':
        createTeam(req, res);
        break;
      case 'PUT':
        updateTeam(req, res);
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

const updateTeam = async(req: any, res: any) => {
  try {
    const { name, formation, shield, _id } = req.body;
    await mongoConnection();
    const updatedTeam = {
      _id,
      name,
      formation,
      shield
    };
    const update = await Team.findOneAndUpdate({ _id }, updatedTeam, { new: true });

    if(!update) {
      return res.status(400).json({message: 'Bad update info'});
    }

    return res.status(200).json({message: 'Match updated successfully'});
  } catch(err) {
    res.status(500).json({message: 'Unexpected error'});
  }
};

export default handler;
