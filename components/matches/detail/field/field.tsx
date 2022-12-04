import { Select } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { MutableRefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFullPlayer } from '../../../../interfaces/Player';
import styles from './field.module.scss';
import { 
  formationKeyMap, 
  formationTypeMap 
} from '../../../../constants/formation';
import { RootState } from '../../../../interfaces/State';
import { matchDetailsActions } from '../../../../store/match-details.slice';
import AvatarMatchLayout from '../avatar/avatar';

interface Props {
  team: IFullPlayer[],
  isAway?: boolean
}

const FieldLayout: NextPage<Props> = ({team, isAway}) => {

  const formationRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const dispatch = useDispatch();
  const formationKey = isAway ? 'away_team' : 'home_team';
  
  const matchDetails = useSelector((state: RootState) => state.matchDetails);

  const updateFormation = () => {
    dispatch(matchDetailsActions.updateInput({input: formationKey, value: formationRef.current.value}));
  };

  const playersMap = team.map((player, idx) => {
    return (
      <AvatarMatchLayout
        key={player.player._id}
        id={player.player._id}
        className={`${styles.player} ${styles[`player${idx+1}`]}`}
        name={player.player.name} 
        image='https://bit.ly/tioluwani-kolawole'
        isAway={isAway}
        overall={player.overall}
      />
    )
  });

  return (
    <div className={styles.fieldGroup}>
      <section className={`${styles.field} 
        ${styles[`${formationTypeMap[matchDetails.match[formationKey].formation]}${formationKeyMap[team.length]}`]}`}>
        {playersMap}
      </section>
      <Select 
        width={'50%'}
        className={styles.formations}
        ref={formationRef}
        onChange={updateFormation}
        value={matchDetails.match[formationKey].formation}
      >
        <option value='t'>Triangle</option>
        <option value='s'>Square</option>
        <option value='f'>Forward</option>
      </Select>
    </div>
  );
}

export default FieldLayout;
