import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MatchDetailsLayout from '../../../components/matches/detail/match-detail';
import { IMatchDetails } from '../../../interfaces/Match';
import { matchDetailsMock } from '../../../mock/match.mock';
import { matchDetailsActions } from '../../../store/match-details.slice';

interface Props {
  match: IMatchDetails;
}

const MatchDetails: NextPage<Props> = ({match}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(matchDetailsActions.setMatchState(match));
  }, [dispatch, match])
  

  return (
    <MatchDetailsLayout />
  );
}

export const getServerSideProps = async(context: any) => {
  const { matchId } = context.query;
  const session = await getSession({ req: context.req});
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
      match: matchDetailsMock
    }
  }
};

export default MatchDetails;
