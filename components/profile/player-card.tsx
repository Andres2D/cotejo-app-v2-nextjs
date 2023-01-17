import type { NextPage } from 'next';
import { Divider } from '@chakra-ui/react';
import styles from './player-card.module.scss';
import Position from './player-card/position';
import { useSelector } from 'react-redux';
import { RootState } from '../../interfaces/State';
import Nationality from './player-card/nationality';
import AvatarSelector from './player-card/avatar-selector';
import NameInput from './player-card/name-input';
import RatingList from './player-card/rating-list';
import { initialState as profileInitialState } from '../../store/profile.slice';
import PlayerCardSkeleton from './player-card-skeleton';

interface Props {
  className: string;
}

const PlayerCard: NextPage<Props> = ({ className }: Props) => {

  const profile = useSelector((state: RootState) => state.profile).profile;

  if(profile === profileInitialState.profile) {
    return (
      <PlayerCardSkeleton />
    );
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>{profile.overall}</h1>
          <Position />
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider}/>
          <Nationality />
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider} />
        </div>
        <AvatarSelector />
      </div>
      <div className={styles.cardBody}>
        <NameInput />
        <Divider
          borderColor={'darks.50'}
          border='1px'
          w='80%'
          className={styles.divider} 
        />
        <RatingList />
      </div>
    </div>
  );
}

export default PlayerCard;
