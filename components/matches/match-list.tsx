import type { NextPage } from 'next';
import { Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import styles from './match-list.module.css';
import Team from './team';

const MatchList: NextPage = () => {
  return (
    <div className={styles.container}>
      <Team
        name={'Liverpool'}
        image={'/images/liverpool-fc-logo.png'}
        width={150}
        height={180}
      />

      <div className={styles.containerVS}>
        <Image
          src={'/images/vs-icon.png'}
          alt='Icon versus'
          width={100}
          height={80}
        ></Image>
        <div>
          <h2>25 Sep 2022</h2>
          <h2>Anfield</h2>
        </div>
      </div>

      <Team
        name={'Liverpool'}
        image={'/images/liverpool-fc-logo.png'}
        width={150}
        height={180}
      />

      <div className={styles.options}>
        <IconButton
          colorScheme='blackAlpha'
          size='lg'
          mb={2}
          aria-label='Edit match'
          icon={<SettingsIcon />}
        />
        <IconButton
          colorScheme='red'
          size='lg'
          aria-label='Deleted match'
          icon={<DeleteIcon />}
        />
      </div>
    </div>
  );
};

export default MatchList;
