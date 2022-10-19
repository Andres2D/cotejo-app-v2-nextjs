import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import MatchList from '../../components/matches/match-list';
import styles from './matches.module.css';

const Matches: NextPage = () => {
  return (
    <div className={styles.matches}>
      <MatchList />
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

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
};

export default Matches;
