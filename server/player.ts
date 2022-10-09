import { Rating, Player } from '../database/models';
import mongoConnection from '../database/database-configuration';
import { Rating as IRating} from '../interfaces/Rating';

const getPlayerStats = async(playerMail: string) => {
  try {
    await mongoConnection();
    const playerDB = await Player.findOne({ email: playerMail});

    if(!playerDB) {
      return null;
    }

    const stats = await Rating.findOne({ player: playerDB._id });

    if(!stats) {
      return null;
    }

    const { 
      overall,
      peace,
      defense,
      dribbling,
      shooting,
      physical,
      player,
      passing
     } = stats;

    const userState: IRating = {
      overall,
      peace,
      defense,
      dribbling,
      shooting,
      physical,
      player,
      passing
    }

    return userState;

  }catch(err) {
    console.log(err);
    return null;
  }
}

export default getPlayerStats;
