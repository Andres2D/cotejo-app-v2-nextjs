import type { NextPage } from 'next';
import styles from './player-stats-skeleton.module.scss';

const PlayerStatsSkeleton: NextPage = () => {

  return (
    <div className={styles.statsSkeleton}>
      {Array.from({length: 6}).map((i,j) => (
        <div key={j}>
          <div className={styles.label}></div>
          <div className={styles.value}></div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsSkeleton;
