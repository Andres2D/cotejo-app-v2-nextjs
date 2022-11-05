import { Image, Input, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './team-form.module.css';

interface Props {
  title?: string;
}

const TeamForm: NextPage<Props> = ({title = 'Home'}: Props) => {
  return (
    <div className={styles.team}>
      <Text 
        bg="gray.400" 
        bgClip="text" 
        fontSize="6xl" 
        fontWeight="extrabold"
      >
        {title}
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
      />
    </div>
  );
}

export default TeamForm;
