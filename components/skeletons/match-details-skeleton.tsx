import type { NextPage } from 'next';
import styles from './match-details-skeleton.module.scss';

const MatchDetailsSkeleton: NextPage = () => {

  const fieldSkeletons = Array.from({length: 2}).map((skeleton, i) => (
    <div key={`${skeleton}${i}`} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.shield} />
        <div className={styles.name} />
        <div className={styles.stars} />
      </div>
      <div className={styles.field} />
      <div className={styles.options} />
    </div>
  ));

  return (
    <section className={styles.match}>
      {fieldSkeletons}
    </section>
  );
};

export default MatchDetailsSkeleton;
