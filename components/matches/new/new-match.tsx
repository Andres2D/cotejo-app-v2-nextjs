
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { Button } from '@chakra-ui/react';
import Steps from './header/steps';
import styles from './new-match.module.css';
import PlaceDate from './place-date/place-date';
import CreateTeams from './teams/create-teams';
import PlayersForm from './players/players-form';

const NewMatch: NextPage = () => {

  const { data: session } = useSession();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <div className={styles.steps}>
      <Steps
        teams={<CreateTeams />}
        schedule={<PlaceDate />}
        players={<PlayersForm />}
      />
      <div className={styles.actions}>
        <Button 
          className={`${styles.nextBtn} ${styles.bntBack}`}
          size='lg'
        >
          Back
        </Button>
        <Button 
          className={styles.nextBtn}
          size='lg'
          colorScheme='brand'
        >
          Next
        </Button>
      </div>
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

export default NewMatch;
