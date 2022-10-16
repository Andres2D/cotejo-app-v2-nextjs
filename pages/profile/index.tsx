import type { NextPage} from 'next';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import { getProfile, getPlayerStats } from '../../server/player';
import { IStats, IProfile } from '../../interfaces/Player';
import { getCountryFlag } from '../../helpers/country';
import { calculateAVG } from '../../helpers/stats';

interface Props {
  image?: string;
  name?: string;
  stats?: string;
  profile?: string;
}

const initialState: IProfile  = {
  overall: 0,
  position: 'CM',
  flag: '',
  name: '',
  image: '',
  nationality: ''
};

const initialStats: IStats = {
  peace: 0,
  shooting: 0,
  passing: 0,
  dribbling: 0,
  defense: 0,
  physical: 0,
}

const Profile: NextPage = ({image, name, stats, profile}: Props) => {

  let parsedStats = JSON.parse(stats || '');
  let parsedProfile = JSON.parse(profile || '');

  const [profileState, setProfileState] = useState(initialState);
  const [statsState, setStatsState] = useState(initialStats);

  useEffect(() => {
    setProfileState({
      overall: parsedStats.overall,
      position: parsedProfile.position,
      flag: getCountryFlag(parsedProfile.nationality),
      name: parsedProfile.name,
      image: parsedProfile.image,
      nationality: parsedProfile.nationality,
    });

    setStatsState({
      defense: parsedStats.defense,
      dribbling: parsedStats.dribbling,
      passing: parsedStats.passing,
      peace: parsedStats.peace,
      physical: parsedStats.physical,
      shooting: parsedStats.shooting,
    })
  }, []);
  
  if(!image || !name || !stats || !profile) {
    return <p>Loading...</p>
  }

  const updateProfile = (field: string, value: string) => {
    if(field === 'nationality') {
      setProfileState(curr => {return {...curr, [field]: value, flag: getCountryFlag(value)}});
    } else {
      setProfileState(curr => {return {...curr, [field]: value}});
    }
  }

  const updateStats = (stat: string, value: number) => {
    setStatsState(curr => {
      const newVal = {...curr, [stat]: value}
      updateProfile('overall', `${calculateAVG(Object.values(newVal))}`);
      return newVal;
    });
  };
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PlayerCard 
          className={styles.playerCard} 
          profile={profileState}
          stats={statsState}
          onUpdate={updateProfile}
        />
        <PlayerRate 
          className={styles.playerStats} 
          stats={statsState}
          onUpdate={updateStats}
        />
      </div>
      <Button 
        className={styles.save}
        size='lg'
        colorScheme='brand'
      >
        Save
      </Button>
    </section>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req });
  const { image, name, email } = session?.user;
  const profile = await getProfile(email);
  const stats = await getPlayerStats(email);
  
  return {
    props: {
      image, 
      name,
      stats: JSON.stringify(stats),
      profile: JSON.stringify(profile)
    }
  }
};

export default Profile;
