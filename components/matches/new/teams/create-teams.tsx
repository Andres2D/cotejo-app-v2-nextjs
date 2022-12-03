import type { NextPage } from 'next';
import TeamForm from '../team/team-form';
import styles from './create-teams.module.scss';

const CreateTeams: NextPage = () => {
  return (
    <div className={styles.form}>
      <TeamForm type='home' />
      <TeamForm type='away' />
    </div>
  );
}

export default CreateTeams;
