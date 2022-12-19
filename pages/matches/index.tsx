import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MatchList from '../../components/matches/match-list';
import { getMatches } from '../../server/matches';
import styles from './matches.module.scss';
import { FullMatch, IMatch } from '../../interfaces/Match';

interface Props {
  matches: string;
}

const Matches: NextPage<Props> = ({matches}) => {

  const matchesList: FullMatch[] = JSON.parse(matches);
  const router = useRouter();

  return (
    <section className={styles.matches}>
      <Button 
        size='lg'
        colorScheme='brand'
        onClick={() => router.push('/matches/new')}
      >
        New Match
      </Button>
      <MatchList
        matches={matchesList}
      />
    </section>
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

  matches = await getMatches(session.user?.email!) || [];

  return {
    props: {
      matches: JSON.stringify(matches) 
    }
  }
};

export default Matches;
