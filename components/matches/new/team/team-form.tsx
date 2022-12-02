import { 
  Image, 
  Input, 
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { MutableRefObject, useRef, useState } from 'react';
import { getAllTeams, getTeamPng } from 'empty-skull';
import { createMatchActions } from '../../../../store/create-match.slice';
import styles from './team-form.module.scss';
import { RootState } from '../../../../interfaces/State';

interface Props {
  type?: 'home' | 'away';
}

const TeamForm: NextPage<Props> = ({type = 'home'}: Props) => {

  const teamName = useRef() as MutableRefObject<HTMLInputElement>;
  const teamShieldRef = useRef() as MutableRefObject<HTMLInputElement>;
  const form = useSelector((state: RootState) => state.createMatch);
  const dispatch = useDispatch();
  const [shieldList, setShieldList] = useState(getAllTeams());
  const defaultTeamShield = 'https://media.api-sports.io/football/teams/40.png';

  const updateField = () => {
    dispatch(createMatchActions.updateInput({input: `${type}_team_name`, value: teamName.current.value}));
  }

  const updateShield = (shield: string) => {
    dispatch(createMatchActions.updateInput({input: `${type}_team_shield`, value: shield}));
  };

  const teams = shieldList.map((team) => (
    <Image
      width={70}
      key={team.img}
      height={70}
      src={team.img}
      alt={team.name}
      className={styles.shield}
      title={team.name}
      onClick={() => updateShield(team.img)}
    />
  ));

  const searchShield = () => {
    if(!teamShieldRef?.current?.value) {
      setShieldList(getAllTeams());
      return;
    }

    const shields = getTeamPng(teamShieldRef?.current?.value);
    setShieldList(Array.isArray(shields) ? shields : [shields]);
  }

  return (
    <div className={styles.team}>
      <Text 
        bg="gray.400" 
        bgClip="text" 
        fontSize="6xl" 
        fontWeight="extrabold"
      >
        {`${type.charAt(0).toUpperCase()}${type.slice(1, type.length)}`}
      </Text>
      <div className={styles.shieldTeam}>
        <Popover>
          <PopoverTrigger>
            <Image
              src={form[`${type}_team_shield`] || defaultTeamShield}
              alt='Team logo'
              width={180}
              height={180}
              className={styles.selectedShield}
            ></Image>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Team</PopoverHeader>
            <PopoverBody>
              <Input 
                  placeholder='Basic usage' 
                  ref={teamShieldRef}
                  onChange={searchShield}
                />
                <div className={styles.shields}>
                  {teams}
                </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <Input 
        placeholder='Name of the team' 
        width={'50%'} 
        colorScheme='white' 
        variant='filled' 
        mt='5'
        onChange={updateField}
        ref={teamName}
      />
    </div>
  );
}

export default TeamForm;
