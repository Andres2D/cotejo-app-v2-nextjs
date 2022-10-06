import { Schema, model, models } from 'mongoose';
import { Rating } from '../../interfaces/Rating';

const RatingSchema = new Schema({
    overall: {
        type: Number,
        require: [true, 'Overall is required']
    },
    peace: {
        type: Number,
        require: [true, 'Peace is required']
    },
    shooting: {
        type: Number,
        require: [true, 'Shooting is required']
    },
    passing: {
        type: Number,
        require: [true, 'Passing is required']
    },
    dribbling: {
        type: Number,
        require: [true, 'Dribbling is required']
    },
    defense: {
        type: Number,
        require: [true, 'Defense is required']
    },
    physical: {
        type: Number,
        require: [true, 'Physical is required']
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
        unique: true
    }
});

RatingSchema.methods.toJSON = function() {
    let {__v, password, ...rating } = this.toObject();
    return rating;
}

const Rating = models['Rating'] ? model<Rating>('Rating') : model<Rating>('Rating', RatingSchema);

export default Rating;
