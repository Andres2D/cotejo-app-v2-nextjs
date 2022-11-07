import { Image, Input, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { MutableRefObject, useRef } from 'react';
import { createMatchActions } from '../../../../store/create-match.slice';
import styles from './team-form.module.css';

interface Props {
  type?: 'home' | 'away';
}

const TeamForm: NextPage<Props> = ({type = 'home'}: Props) => {

  const teamName = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  const updateField = () => {
    console.log(`${type}_team_name`);
    console.log(teamName.current.value);
    dispatch(createMatchActions.updateInput({input: `${type}_team_name`, value: teamName.current.value}))
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
        <Image
          src={'/images/liverpool-fc-logo.png'}
          alt='Team logo'
          width={150}
          height={180}
        ></Image>
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
