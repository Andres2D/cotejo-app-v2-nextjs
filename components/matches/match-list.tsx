import type { NextPage } from 'next';
import { IconButton, Image } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import { FullMatch } from '../../interfaces/Match';

interface Props {
  matches: FullMatch[]
}

const MatchList: NextPage<Props> = ({matches}) => {

  const router = useRouter();

  const goToMatchDetails = (matchId: string) => {
    router.push(`/matches/${matchId}`)
  };

  const matchesListMap = matches.map(({_id, date, location, away_team, home_team}) => {
    return (
      <div 
        className={styles.container} 
        key={_id}
        onClick={() => goToMatchDetails(_id)}
      >
        <div className={styles.matchDetails}>
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
              width={55}
              height={45}
            ></Image>
            <div className={styles.details}>
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
        </div>
        <div className={styles.options}>
          <IconButton
            colorScheme='teal'
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
