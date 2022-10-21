import mongoConnection from '../database/database-configuration';
import { Match } from '../database/models';

export const getMatches = async() => {
  try {
    await mongoConnection();
    const matches = await Match.find()
      .populate('home_team', 'name formation shield')
      .populate('away_team', 'name formation shield');
    
    return matches;

  }catch(err) {
    console.log(err);
    return null;
  }
};
