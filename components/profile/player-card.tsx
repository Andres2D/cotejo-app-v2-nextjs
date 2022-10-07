import type { NextPage } from 'next';
import { Avatar, Divider } from '@chakra-ui/react';
import styles from './player-card.module.css';
import Image from 'next/image';

interface Props {
  className: string;
}

const PlayerCard: NextPage<Props> = (props: Props) => {

  return (
    <div className={`${styles.card} ${props.className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.overall}>
          <h1 className={styles.title}>90</h1>
          <p className={styles.position}>CM</p>
          <Divider
            borderColor={'darks.50'}
            border='1px'
            w='80px'
            className={styles.divider}/>
          <Image
            width={70}
            height={50}
            src='/images/colombia-flag.png'
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
          name='Dan Abrahmov' 
          src='https://bit.ly/dan-abramov' 
          size='2xl'
        />
      </div>
      <div className={styles.cardBody}>
        <h2 className={styles.title}>Andres Alcaraz</h2>
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
