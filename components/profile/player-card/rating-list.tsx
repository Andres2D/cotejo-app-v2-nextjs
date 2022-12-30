import { Divider } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../interfaces/State';

import styles from './rating-list.module.scss';

const RatingList: NextPage = () => {

  const { 
    peace,
    defense,
    dribbling,
    passing,
    physical,
    shooting
  } = useSelector((state: RootState) => state.profile).stats;

  return (
    <div className={styles.rating}>
      <div className={styles.score}>
        <div className={styles.rate}>
          <h2>{peace}</h2>
          <h2>PAC</h2>
        </div>
        <div className={styles.rate}>
          <h2>{shooting}</h2>
          <h2>SHO</h2>
        </div>
        <div className={styles.rate}>
          <h2>{passing}</h2>
          <h2>PAS</h2>
        </div>
      </div>
      <Divider
        borderColor={'darks.50'}
        border='1px'
        h='170px'
        orientation='vertical'
        className={styles.divider} 
      />
      <div className={styles.score}>
        <div className={styles.rate}>
          <h2>{dribbling}</h2>
          <h2>DRB</h2>
        </div>
        <div className={styles.rate}>
          <h2>{defense}</h2>
          <h2>DEF</h2>
        </div>
        <div className={styles.rate}>
          <h2>{physical}</h2>
          <h2>PHY</h2>
        </div>
      </div>
    </div>
  );
};

export default RatingList;
