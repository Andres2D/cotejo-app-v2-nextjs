import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import MatchList from '../../components/matches/match-list';
import { getMatches } from '../../server/matches';
import styles from './matches.module.css';
import { FullMatch, IMatch } from '../../interfaces/Match';

interface Props {
  matches: string;
}

const Matches: NextPage<Props> = ({matches}) => {

  const matchesList: FullMatch[] = JSON.parse(matches);

  return (
    <div className={styles.matches}>
      <MatchList
        matches={matchesList}
      />
      <Button 
        size='lg'
        colorScheme='brand'
      >
        New Match
      </Button>
    </div>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req});
  let matches: IMatch[] = [];

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  matches = await getMatches() || [];

  return {
    props: {
      matches: JSON.stringify(matches) 
    }
  }
};

export default Matches;
