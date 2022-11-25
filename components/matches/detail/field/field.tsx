import { Avatar } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { IFullPlayer } from '../../../../interfaces/Player';
import styles from './field.module.css';
import { 
  formationKeyMap, 
  formationTypeMap 
} from '../../../../constants/formation';

interface Props {
  team: IFullPlayer[],
  formation: string
}

const FieldLayout: NextPage<Props> = ({team, formation}) => {

  const playersMap = team.map((player, idx) => {
    return (
      <Avatar
        key={idx}
        size='lg'
        className={`${styles.avatar} ${styles.player} ${styles[`player${idx+1}`]}`}
        name={player.player.name} 
        src='https://bit.ly/tioluwani-kolawole'
      />
    )
  });

  return (
    <section className={`${styles.field} ${styles[`${formationTypeMap[formation]}${formationKeyMap[team.length]}`]}`}>
      {playersMap}
    </section>
  );
}

export default FieldLayout;
