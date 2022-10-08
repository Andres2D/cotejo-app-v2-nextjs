import type { NextPage } from 'next';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';

const Profile: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <PlayerCard className={styles.playerCard} />
      <PlayerRate className={styles.playerStats} />
    </div>
  );
}

export default Profile;
