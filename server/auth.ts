
import { Player } from '../database/models';
import googleVerification from '../helpers/google-auth';
import mongoConnection from '../database/database-configuration';

export const googleAuth = async(token: string): Promise<boolean | null> => {
  try {
    // let isNewUser = false;
    let player;
    const googlePayload = await googleVerification(token);
    
    if(!googlePayload) {
      return false;
    }
    
    const { email, name, picture } = googlePayload;
    await mongoConnection();
    const playerDB = await Player.findOne();

    if(!playerDB) {
      // isNewUser = true;

      player = new Player({
        email,
        password: '@@@',
        nickname: name,
        image: picture,
        name,
        number: 99,
        status: 'new',
        google: true
      });
    }

    const playerSign = await player?.save();
    if(!playerSign) {
      return false;
    }
    return true;

  }catch(err) {
    return false;
  }
};
