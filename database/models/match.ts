import { Schema, model, models } from 'mongoose';
import { IMatch } from '../../interfaces/Match';

const MatchSchema = new Schema({
  date: {
    type: String,
    require: [true, 'Date is required']
  },
  location: {
    type: String,
    require: [true, 'Location is required']
  },
  home_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    unique: true
  },
  away_team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    unique: true
  }
});

MatchSchema.methods.toJSON = function() {
    let {__v, ...match } = this.toObject();
    return match;
}

const Match = models['Match'] ? model<IMatch>('Match') : model<IMatch>('Match', MatchSchema);

export default Match;
