import { 
  Player,
  Rating
} from '../../../database/models';
import mongoConnection from '../../../database/database-configuration';

const handler = async(req: any, res: any) => {
  try {
    if(req.method === 'PUT') {
      const { 
        email, 
        name, 
        position, 
        nationality,
        defense,
        dribbling,
        passing,
        peace,
        physical,
        shooting,
        overall
      } = req.body;

      await mongoConnection();

      let playerDB = await Player.findOne({ email }); 
      
      if(!playerDB) {
        res.status(400).json({message: 'Player not found'});
      }

      let ratingDB = await Rating.findOne({ player: playerDB?._id});

      playerDB!.name = name;
      playerDB!.position = position;
      playerDB!.nationality = nationality;

      ratingDB!.overall = overall;
      ratingDB!.defense = defense;
      ratingDB!.dribbling = dribbling;
      ratingDB!.passing = passing;
      ratingDB!.peace = peace;
      ratingDB!.physical = physical;
      ratingDB!.shooting = shooting;
      
      playerDB?.save();
      ratingDB?.save();

      res.status(200).json({message: 'Profile updated'});

    }
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
}

export default handler;
