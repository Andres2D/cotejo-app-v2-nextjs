
import { Button, Grid, GridItem } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import styles from './teams.module.css';
import Header from '../../../../components/match/new/header';
import StepTeams from '../../../../components/match/new/step-teams';

const NewMatchStepTeams: NextPage = () => {

  const { data: session } = useSession();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <Grid
      templateAreas={`"header header"
          "nav main"
          "nav footer"`}
      gap='1'
      p='20'
    >
      <GridItem pl='2' area={'header'}>
        <Header/>
      </GridItem>
      <GridItem pt='20' w='100%'>
        <StepTeams
          title={'Home'} />
      </GridItem>
      <GridItem pt='20' w='100%'>
        <StepTeams
          title={'Away'} />
      </GridItem>
      <GridItem mt='40%' area={'footer'}>
        <div className={styles.footer}>
          <Button 
            size='lg'
            colorScheme='brand'
          >
            Next
          </Button>
        </div>
      </GridItem>
    </Grid>
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

export default NewMatchStepTeams;
