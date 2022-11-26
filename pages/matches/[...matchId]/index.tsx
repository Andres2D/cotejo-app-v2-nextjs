import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import MatchDetailsLayout from '../../../components/matches/detail/match-detail';

interface Props {
  matchId: string;
}

const MatchDetails: NextPage<Props> = ({matchId}) => {

  return (
    <MatchDetailsLayout
      matchId={matchId} 
    />
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
      matchId
    }
  }
};

export default MatchDetails;
