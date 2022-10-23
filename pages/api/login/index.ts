import bcryptjs from 'bcryptjs';
import { Player } from "../../../database/models";
import mongoConnection from "../../../database/database-configuration";

const handler = async(req: any, res: any) => {
  try {
    if(req.method === 'POST') {
      const { email, password } = req.body;
      await mongoConnection();

      const player = await Player.findOne({email});
      if(!player) {
        res.status(400).json({ message: 'User does not exist'});
      }

      const validPassword = bcryptjs.compareSync(password, player?.password!);
      
      if(!validPassword) {
        res.status(400).json({ message: 'Invalid password or email'});
      }

      return  res.status(200).json(player);
    }
    res.status(400).json({ message: 'Bad method'});
  }catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Unexpected error'});
  }
};

export default handler;
