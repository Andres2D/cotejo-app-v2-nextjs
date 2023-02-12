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
  },
  fullTime: {
    type: Boolean,
    required: [true, 'Full time is required'],
    default: false
  },
  homeScore: {
    type: Number,
    required: [true, 'Home score is required'],
    default: 0
  },
  awayScore: {
    type: Number,
    required: [true, 'Away score is required'],
    default: 0
  }
});

MatchSchema.methods.toJSON = function() {
    let {__v, ...match } = this.toObject();
    return match;
}

const Match = models['Match'] ? model<IMatch>('Match') : model<IMatch>('Match', MatchSchema);

export default Match;
