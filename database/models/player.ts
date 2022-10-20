import { Schema, model, models } from 'mongoose';
import { Player } from '../../interfaces/Player';

const PlayerSchema = new Schema({
  email: {
    type: String,
    require: [true, 'The mail is required'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'The password is required']
  },
  nickname: {
    type: String,
  },
  name: {
    type: String,
    require: [true, 'The name is required']
  },
  number: {
    type: Number,
  },
  status: {
    type: String
  },
  image: {
    type: String
  },
  google: {
    type: Boolean,
    default: false
  },
  nationality: {
  type: String,
  default: 'World'
  },
  position: {
  type: String,
  default: 'CM'
  }
});

PlayerSchema.methods.toJSON = function() {
  let {__v, password, ...player } = this.toObject();
  return player;
}

const Player = models['Player'] ? model<Player>('Player') : model<Player>('Player', PlayerSchema);

export default Player;
