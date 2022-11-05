import type { NextPage } from 'next';
import TeamForm from '../team/team-form';
import styles from './create-teams.module.css';

const CreateTeams: NextPage = () => {
  return (
    <div className={styles.form}>
      <TeamForm title='Home' />
      <TeamForm title='Away' />
    </div>
  );
}

export default CreateTeams;
