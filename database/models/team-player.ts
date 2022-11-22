import { Schema, model, models } from 'mongoose';
import { ITeamPlayer } from '../../interfaces/TeamPlayer';

const TeamPlayerSchema = new Schema({
    position: {
        type: String,
        require: [true, 'Position is required']
    },
    isCaptain: {
        type: Boolean,
        default: false 
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    }
});

TeamPlayerSchema.methods.toJSON = function() {
    let {__v, ...teamPlayer } = this.toObject();
    return teamPlayer;
}

const TeamPlayer = models['TeamPlayer'] ? model<ITeamPlayer>('TeamPlayer') : model<ITeamPlayer>('TeamPlayer', TeamPlayerSchema);

export default TeamPlayer;
