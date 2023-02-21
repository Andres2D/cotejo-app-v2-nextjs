import { getFlagSvg } from 'empty-skull';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeaderSettings from '../../../accessibility/header-setting';
import MatchDetailsLayout from '../../../components/matches/detail/match-detail';
import { IMatchDetailsResponse } from '../../../interfaces/Match';
import { getMatch } from '../../../server/matches';
import { getProfile } from '../../../server/player';
import { matchDetailsActions } from '../../../store/match-details.slice';
import { matchesListActions } from '../../../store/matches-list.slice';
import { profileActions } from '../../../store/profile.slice';

interface Props {
  match: string;
  profile: string;
}

const MatchDetails: NextPage<Props> = ({match, profile}) => {

  const dispatch = useDispatch();

  // Persisting store profile
  // TODO: Change way to persis state
  let parsedProfile = JSON.parse(profile || '');

  const flagResponse = getFlagSvg(parsedProfile.nationality, true);

  useEffect(() => {

    dispatch(profileActions.setProfile({
      _id: parsedProfile._id,
      overall: 0,
      position: parsedProfile.position,
      flag: Array.isArray(flagResponse) ? flagResponse[0].flag : flagResponse.flag,
      name: parsedProfile.name,
      image: parsedProfile.image,
      nationality: parsedProfile.nationality,
    }));

  }, []);

  const matchDetail: IMatchDetailsResponse = JSON.parse(match);

  useEffect(() => {
    dispatch(matchDetailsActions.setMatchState({...matchDetail, playersSelected: [], changePlayerModalActive: false}));

    dispatch(matchesListActions.setSelectedMatch({
      _id: matchDetail.match._id,
      away_team: matchDetail.match.away_team,
      awayScore: matchDetail.match.awayScore,
      date: matchDetail.match.date,
      fullTime: matchDetail.match.fullTime,
      home_team: matchDetail.match.home_team,
      homeScore: matchDetail.match.homeScore,
      location: matchDetail.match.location
    }));
    
  }, [dispatch, matchDetail])
  
  return (
    <>
      <HeaderSettings 
        title={`${matchDetail.match.home_team.name} vs ${matchDetail.match.away_team.name}`} 
        description='Set the line up' 
      />
      <MatchDetailsLayout />
    </>
  );
}

export const getServerSideProps = async(context: any) => {
  const { matchId } = context.query;
  const session = await getSession({ req: context.req});
  const matchData = await getMatch(matchId);
  
  if(!session || !session.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  const { email } = session.user;
  const profile = await getProfile(email!);

  return {
    props: { 
      session,
      match: JSON.stringify(matchData),
      profile: JSON.stringify(profile)
    }
  }
};

export default MatchDetails;
