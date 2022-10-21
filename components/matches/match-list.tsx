import type { NextPage } from 'next';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import styles from './match-list.module.css';
import Team from './team';
import { FullMatch } from '../../interfaces/Match';

interface Props {
  matches: FullMatch[]
}

const MatchList: NextPage<Props> = ({matches}) => {

  const matchesListMap = matches.map(({_id, date, location, away_team, home_team}) => {
    return (
      <div className={styles.container} key={_id}>
        <Team
          name={home_team.name}
          image={home_team.shield}
          width={120}
          height={120}
        />

        <div className={styles.containerVS}>
          <Image
            src={'/images/vs-icon.png'}
            alt='Icon versus'
            width={80}
            height={60}
          ></Image>
          <div>
            <h2>{date}</h2>
            <h2>{location}</h2>
          </div>
        </div>

        <Team
          name={away_team.name}
          image={away_team.shield}
          width={120}
          height={120}
        />

        <div className={styles.options}>
          <IconButton
            colorScheme='blackAlpha'
            size='md'
            mb={2}
            aria-label='Edit match'
            icon={<SettingsIcon />}
          />
          <IconButton
            colorScheme='red'
            size='md'
            aria-label='Deleted match'
            icon={<DeleteIcon />}
          />
        </div>
      </div>
    )
  });

  return (
    <>
      {matchesListMap}
    </>
  );
};

export default MatchList;
