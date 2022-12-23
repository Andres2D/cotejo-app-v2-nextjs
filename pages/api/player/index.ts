import bcryptjs from 'bcryptjs';
import { 
  Player,
  Rating
} from '../../../database/models';
import mongoConnection from '../../../database/database-configuration';
import { Player as IPlayer, IPlayerList } from '../../../interfaces/Player';

// TODO: type req and res
const handler = async(req: any, res: any) => {
  try {
    switch(req.method) {
      case 'PUT':
        updatePlayer(req, res);
      break;
      case 'POST':
        registerPlayer(req, res);
      break;
      case 'GET':
        getPlayers(req, res);
      break;
      default:
        res.status(400).json({message: 'Bad method'});
      break;
    }
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
}

const registerPlayer = async(req: any, res: any) => {
  try {

    const { email, name, password } = req.body;

    await mongoConnection();

    const playerExist = await Player.findOne({email});

    if(playerExist) {
      res.status(400).json({message: 'Player already exist'});
    }

    const newPlayer = new Player({
      email,
      name,
      password,
      nickname: name,
      number: 0,
      status: '',
      image: 'http://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png',
      google: false,
      nationality: 'World',
      position: 'CM'
    });

    const salt = bcryptjs.genSaltSync();
    newPlayer.password = bcryptjs.hashSync(password, salt);
    
    await newPlayer.save();

    const rating = new Rating({
      overall: 50,
      peace: 50,
      defense: 50,
      dribbling: 50,
      passing: 50,
      physical: 50,
      shooting: 50,
      player: newPlayer._id
    });

    const ratingStore = await rating?.save();
    
    // Rollback
    if(!ratingStore) {
      await Player.deleteOne({ _id: newPlayer._id});
      res.status(500).json({message: 'Unexpected error'});
    }
    
    res.status(200).json({message: 'Player created'});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
};

const updatePlayer = async(req: any, res: any) => {
  try {
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

  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
};

const getPlayers = async(req: any, res: any) => {
  try {
    let playersList: IPlayerList[] = [];
    const { query } = req.query;
    await mongoConnection();
    const regex = new RegExp(query, 'i');
    const playersDB = await Player.find({
      $or: [
        { email: regex },
        { name: regex }
      ]
    });


    if(!playersDB || playersDB.length === 0) {
      res.status(200).json({players: []});
      return;
    }

    for (const player of playersDB) {
      const stats = await Rating.findOne({ player: player._id });
      const {
        nationality,
        position,
        name,
        image,
        _id
      } = player;

      const playerProfile: IPlayerList = {
        nationality,
        position,
        name,
        image,
        _id: _id!,
        overall: stats?.overall
      };

      playersList.push(playerProfile);
    }
    
    res.status(200).json({players: playersList});
  }catch(err) {
    console.log(err);
    res.status(500).json({message: 'Unexpected error'});
  }
}

export default handler;
