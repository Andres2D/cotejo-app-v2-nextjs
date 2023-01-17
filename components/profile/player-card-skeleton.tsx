import type { NextPage } from 'next';
import styles from './player-card-skeleton.module.scss';

const PlayerCardSkeleton: NextPage = () => {

  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.header}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.top}></div>
        <div className={styles.bottom}>
          <div className={styles.barr}></div>
          <div className={styles.barr}></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCardSkeleton;
