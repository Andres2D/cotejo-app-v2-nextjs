import { Checkbox, Select, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { ChangeEvent, MutableRefObject, useRef } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { IFullPlayer } from '../../../../interfaces/Player';
import styles from './field.module.scss';
import { 
  formationAlias,
  formationKeyMap, 
  formationTypeMap 
} from '../../../../constants/formation';
import { updateTeam } from '../../../../services/api-configuration';
import { RootState } from '../../../../interfaces/State';
import { matchDetailsActions } from '../../../../store/match-details.slice';
import AvatarMatchLayout from '../avatar/avatar';
import { SettingOption } from '../../../../types/match';
import FieldHeader from './header';

interface Props {
  team: IFullPlayer[],
  isAway?: boolean
}

const FieldLayout: NextPage<Props> = ({team, isAway}) => {

  const formationRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const dispatch = useDispatch();
  const teamKey = isAway ? 'away_team' : 'home_team';
  const simpleTeamKey = isAway ? 'away' : 'home';
  const { mutate } = useMutation(updateTeam);
  
  const matchDetails = useSelector((state: RootState) => state.matchDetails);
  const teamAverage: number =
    matchDetails[simpleTeamKey].length > 0
    ? Math.floor(matchDetails[simpleTeamKey].map((player) => player.overall).reduce((a, b) => a + b) /
      matchDetails[simpleTeamKey].length)
    : 0;

  const updateFormation = () => {
    dispatch(matchDetailsActions.updateInput({input: teamKey, value: formationRef.current.value}));
    const { name, shield, _id} = matchDetails.match[teamKey];
    mutate({ name, shield, _id, formation: formationRef.current.value });
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
        image={player.player.image}
        isAway={isAway}
        overall={player.overall}
      />
    )
  });

  return (
    <div className={styles.fieldGroup}>
      <FieldHeader
        teamName={matchDetails.match[teamKey].name}
        teamShield={matchDetails.match[teamKey].shield}
        teamOverall={teamAverage}
        isAway={isAway}
        fullTime={matchDetails.match.fullTime}
      />
      <section className={`${styles.field} 
        ${styles[`${formationTypeMap[matchDetails.match[teamKey].formation]}${formationKeyMap[team.length]}`]}`}>
        {playersMap}
        <div className={styles.smallArea} />
        <div className={styles.bigArea} />
        <div className={styles.outArea} />
        <div className={styles.middle} />
      </section>
      <Stack className={styles.check} spacing={5} direction='row'>
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
        value={matchDetails.match[teamKey].formation}
        color={'gray.50'}
      >
        { team.length > 0 &&
          ['t','s','f'].map(op => (
            <option 
              key={op} 
              value={op}>
                {formationAlias[team.length][op]}
            </option>
          ))
        }
      </Select>
    </div>
  );
}

export default FieldLayout;
