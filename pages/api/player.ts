import { Player } from '../../database/models';
import mongoConnection from '../../database/database-configuration';

const handler = async(req: any, res: any) => {
  try {
    if(req.method === 'PUT') {
      const { email, name, position, nationality } = req.body;

      await mongoConnection();

      let playerDB = await Player.findOne({ email }); 

      console.log(playerDB);

      if(!playerDB) {
        res.status(400).json({message: 'Player not found'});
      }

      playerDB!.name = name;
      playerDB!.position = position;
      playerDB!.nationality = nationality;
      
      playerDB?.save();

      res.status(200).json({message: 'Profile updated'});

    }
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
}

export default handler;
