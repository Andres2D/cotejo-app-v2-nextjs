import { Checkbox, Select, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { ChangeEvent, MutableRefObject, useRef } from 'react';
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
import { SettingOption } from '../../../../types/match';

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

  const checkHandler = (evt: ChangeEvent<HTMLInputElement>, setting: SettingOption) => {

    dispatch(matchDetailsActions.updateInterfaceSettings(
      {
        team: isAway ? 'away_team' : 'home_team', 
        setting: setting,
        value: evt.target.checked
      }
    ));
  }

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
      <Stack spacing={5} direction='row'>
        <Checkbox 
          colorScheme='yellow'
          isChecked={
            isAway 
            ? matchDetails.match.away_team.showNames 
            : matchDetails.match.home_team.showNames
          }
          onChange={(evt) => checkHandler(evt, 'showNames')}>
          Show names
        </Checkbox>
        <Checkbox 
          colorScheme='green'
          isChecked={
            isAway 
            ? matchDetails.match.away_team.showStats 
            : matchDetails.match.home_team.showStats
          }
          onChange={(evt) => checkHandler(evt, 'showStats')}>
          Show stats
        </Checkbox>
      </Stack>
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
