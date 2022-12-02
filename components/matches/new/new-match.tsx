
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Steps from './header/steps';
import styles from './new-match.module.scss';
import PlaceDate from './place-date/place-date';
import CreateTeams from './teams/create-teams';
import PlayersForm from './players/players-form';
import { RootState } from '../../../interfaces/State';
import { createMatchActions } from '../../../store/create-match.slice';

const NewMatch: NextPage = () => {

  const { data: session } = useSession();
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.createMatch);

  const nextStepHandler = (flag: string) => {
    const newValue = flag === 'next' ? form.current_step + 1 : form.current_step - 1;
    dispatch(createMatchActions.updateInputNumber({input: 'current_step', value: newValue}));
  }

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
        {form.current_step !== 0 &&
          <Button 
            className={`${styles.nextBtn} ${styles.bntBack}`}
            size='lg'
            onClick={() => nextStepHandler('back')}
          >
            Back
          </Button>
        }
        {form.current_step !== 2 &&
          <Button 
            className={styles.nextBtn}
            size='lg'
            colorScheme='brand'
            onClick={() => nextStepHandler('next')}
          >
            Next
          </Button>
        }
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
