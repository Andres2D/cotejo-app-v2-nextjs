
import { Player } from '../database/models';
import googleVerification from '../helpers/google-auth';
import mongoConnection from '../database/database-configuration';
import Rating from '../database/models/rating';

export const googleAuth = async(token: string): Promise<boolean | null> => {
  try {
    let player;
    const googlePayload = await googleVerification(token);
    
    if(!googlePayload) {
      return false;
    }
    
    const { email, name, picture } = googlePayload;
    await mongoConnection();
    const playerDB = await Player.findOne();

    if(playerDB) {
      return true;
    }
    
    player = new Player({
      email,
      password: '@@@',
      nickname: name,
      image: picture,
      name,
      number: 99,
      status: 'new',
      google: true,
      nationality: 'World',
      position: 'CM'
    });

    const playerSign = await player?.save();

    if(!playerSign) {
      return false;
    }

    const rating = new Rating({
      overall: 50,
      peace: 50,
      defense: 50,
      dribbling: 50,
      passing: 50,
      physical: 50,
      shooting: 50,
      player: playerSign._id
    });

    const ratingStore = await rating?.save();
    
    // Rollback
    if(!ratingStore) {
      await player.deleteOne({ _id: playerSign._id});
      return false;
    }

    return true;

  }catch(err) {
    return false;
  }
};
