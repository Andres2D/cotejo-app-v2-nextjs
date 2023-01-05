import { Query } from 'mongoose';
import mongoConnection from '../database/database-configuration';
import { Match, Player } from '../database/models';
import { TeamPlayer } from '../database/models';
import { Rating } from '../database/models';
import { Rating as IRating } from '../interfaces/Rating';

export const getMatches = async (userEmail: string) => {
  try {
    if(!userEmail) {
      return null;
    }
    await mongoConnection();

    const playerDB = await Player.findOne({email: userEmail});

    if(!playerDB) {
      return null;
    }

    const teamsDB = await TeamPlayer.find({ player: playerDB._id});
    if(teamsDB.length < 0) {
      return null;
    }

    const query = teamsDB.map(({team}) => team);

    const matches = await Match.find({
      $or: [{home_team: {$in: query}}, {away_team: {$in: query}}]
    })
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

    const [home, away]: any[] = await Promise.all([
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
    home.forEach(({ player }: any) => {
      ratingHomeQueries.push(Rating.findOne({ player: player._id }));
    });

    away.forEach(({ player }: any) => {
      ratingAwayQueries.push(Rating.findOne({ player: player._id }));
    });

    const ratingsHome = await Promise.all(ratingHomeQueries);
    const ratingsAway = await Promise.all(ratingAwayQueries);

    ratingsHome.forEach((rating: any) => {
        home.forEach(({player}: any, i: number) => {
            if(rating && rating.player.equals(player._id)) {
                home[i].overall = rating.overall;
            }
        });
    });

    ratingsAway.forEach((rating: any) => {
        away.forEach(({player}: any, i: number) => {
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
