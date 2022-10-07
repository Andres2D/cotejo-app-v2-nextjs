import type { NextPage } from 'next';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';

const Profile: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <PlayerCard className={styles.playerCard} />
      <ul>
        <li>sad</li>
        <li> asd</li>
        <li>a ads</li>
        <li>asd</li>
        <li> as</li>
      </ul>
    </div>
  );
}

export default Profile;
