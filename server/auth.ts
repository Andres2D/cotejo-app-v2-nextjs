
import { Player } from '../database/models';
import googleVerification from '../helpers/google-auth';
import generateJWT from '../helpers/jwt';
import mongoConnection from '../database/database-configuration';

export const googleAuth = async(token: string): Promise<string | null> => {
  try {
    // let isNewUser = false;
    let player;
    const googlePayload = await googleVerification(token);
    
    if(!googlePayload) {
      return null;
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

    await player?.save();
    if(!player || !player._id) {
      return null;
    }
    const newToken = await generateJWT(player._id.toString());
    return newToken;

  }catch(err) {
    return null;
  }
};
