import { Schema, model, models } from 'mongoose';
import { ITeam } from '../../interfaces/Team';

const TeamSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    formation: {
        type: String,
        require: [true, 'Formation is required']
    },
    shield: {
        type: String,
        require: [true, 'Shield is required']
    }
});

TeamSchema.methods.toJSON = function() {
    let {__v, ...team } = this.toObject();
    return team;
}

const Team = models['Team'] ? model<ITeam>('Team') : model<ITeam>('Team', TeamSchema);

export default Team;
