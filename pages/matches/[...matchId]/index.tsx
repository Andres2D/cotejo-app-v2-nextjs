import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MatchDetailsLayout from '../../../components/matches/detail/match-detail';
import { getMatch } from '../../../server/matches';
import { matchDetailsActions } from '../../../store/match-details.slice';

interface Props {
  match: string;
}

const MatchDetails: NextPage<Props> = ({match}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(matchDetailsActions.setMatchState(JSON.parse(match)));
  }, [dispatch, match])
  

  return (
    <MatchDetailsLayout />
  );
}

export const getServerSideProps = async(context: any) => {
  const { matchId } = context.query;
  const session = await getSession({ req: context.req});
  const matchData = await getMatch(matchId);
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: { 
      session,
      match: JSON.stringify(matchData)
    }
  }
};

export default MatchDetails;
