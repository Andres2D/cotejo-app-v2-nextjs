
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import CreateTeams from './teams/create-teams';
import { Button } from '@chakra-ui/react';
import Steps from './header/steps';
import styles from './new-match.module.css';

const NewMatch: NextPage = () => {

  const { data: session } = useSession();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <div className={styles.steps}>
      <Steps
        teams={<CreateTeams />}
        players={<p>Two</p>}
        schedule={<p>Three</p>}
      />
      <Button 
        className={styles.nextBtn}
        size='lg'
        colorScheme='brand'
      >
        Next
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

export default NewMatch;
