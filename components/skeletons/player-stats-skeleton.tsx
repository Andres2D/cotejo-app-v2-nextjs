import type { NextPage } from 'next';
import styles from './player-stats-skeleton.module.scss';

const PlayerStatsSkeleton: NextPage = () => {

  return (
    <div className={styles.statsSkeleton}>
      {Array.from({length: 6}).map((i,j) => (
        <div key={`${i}${j}`}>
          <div className={styles.label} />
          <div className={styles.value} />
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsSkeleton;
