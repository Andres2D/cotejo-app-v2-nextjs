import { Query } from 'mongoose';
import mongoConnection from '../database/database-configuration';
import { Match } from '../database/models';
import { TeamPlayer } from '../database/models';
import { Rating } from '../database/models';
import { Rating as IRating } from '../interfaces/Rating';

export const getMatches = async () => {
  try {
    await mongoConnection();
    const matches = await Match.find()
      .populate('home_team', 'name formation shield')
      .populate('away_team', 'name formation shield');

    return matches;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getMatch = async (matchId: string) => {
  try {
    await mongoConnection();
    let ratingHomeQueries: Query<{} | null, {}, {}, IRating>[] = [];
    let ratingAwayQueries: Query<{} | null, {}, {}, IRating>[] = [];

    const match = await Match.findById(matchId)
      .populate('home_team', 'name formation shield')
      .populate('away_team', 'name formation shield');

    if (!match) {
      return null;
    }

    const [home, away] = await Promise.all([
      TeamPlayer.find({ team: match.home_team })
        .populate('player', 'nickname name number status image')
        .lean()
        .exec(),
      TeamPlayer.find({ team: match.away_team })
        .populate('player', 'nickname name number status image')
        .lean()
        .exec(),
    ]);

    // TODO: Improve interfaces
    home.forEach(({ player }) => {
      ratingHomeQueries.push(Rating.findOne({ player: player._id }));
    });

    away.forEach(({ player }) => {
      ratingAwayQueries.push(Rating.findOne({ player: player._id }));
    });

    const ratingsHome = await Promise.all(ratingHomeQueries);
    const ratingsAway = await Promise.all(ratingAwayQueries);

    ratingsHome.forEach((rating) => {
        home.forEach(({player}, i) => {
            if(rating && rating.player.equals(player._id)) {
                home[i].overall = rating.overall;
            }
        });
    });

    ratingsAway.forEach((rating) => {
        away.forEach(({player}, i) => {
            if(rating && rating.player.equals(player._id)) {
                away[i].overall = rating.overall;
            }
        });
    });

    return {
      match,
      home,
      away,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const putChangePlayersPosition = () => {
  console.log('Inn');
};
