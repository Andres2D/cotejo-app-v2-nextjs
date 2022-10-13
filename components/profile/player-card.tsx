import type { NextPage } from 'next';
import { Avatar, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './player-card.module.css';
import { Player } from '../../interfaces/Player';

interface Props {
  className: string;
  profile: Player;
  overall: number;
  flag: string;
}

const PlayerCard: NextPage<Props> = ({profile, className, overall, flag}: Props) => {

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>{overall}</h1>
          <p className={styles.position}>{profile.position}</p>
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider}/>
          <Image
            width={70}
            height={50}
            src={flag}
            alt='Dan Abramov'
          />
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider} />
        </div>
        <Avatar
          className={styles.avatar} 
          name={profile.name}
          src={profile.image} 
          size='2xl'
        />
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.title}>{profile.name}</h2>
        <Divider
          borderColor={'darks.50'}
          border='1px'
          w='280px'
          className={styles.divider} 
        />
        <div className={styles.rating}>
          <div className={styles.score}>
            <div className={styles.rate}>
              <h2>50</h2>
              <h2>PAC</h2>
            </div>
            <div className={styles.rate}>
              <h2>50</h2>
              <h2>SHO</h2>
            </div>
            <div className={styles.rate}>
              <h2>50</h2>
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
              <h2>50</h2>
              <h2>PAC</h2>
            </div>
            <div className={styles.rate}>
              <h2>50</h2>
              <h2>SHO</h2>
            </div>
            <div className={styles.rate}>
              <h2>50</h2>
              <h2>PAS</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
