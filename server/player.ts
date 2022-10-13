import { Rating, Player } from '../database/models';
import mongoConnection from '../database/database-configuration';
import { Rating as IRating} from '../interfaces/Rating';
import { Player as IPlayer} from '../interfaces/Player';

export const getPlayerStats = async(playerMail: string) => {
  try {
    await mongoConnection();
    const playerDB = await getProfile(playerMail);

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

export const getProfile = async(playerMail: string) => {
  try {

    await mongoConnection();
    const playerDB = await Player.findOne({ email: playerMail});

    if(!playerDB) {
      return null;
    }

    const {
      _id,
      email,
      password,
      nickname,
      name,
      number,
      status,
      image,
      google,
      position,
      nationality
    } = playerDB;

    const player: IPlayer = {
      _id,
      email,
      password,
      nickname,
      name,
      number,
      status,
      image,
      google,
      position,
      nationality
    };

    return player;

  }catch(err) {
    console.log(err);
    return null;
  }
}
