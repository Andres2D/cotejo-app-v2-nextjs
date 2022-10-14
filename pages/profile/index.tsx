import type { NextPage} from 'next';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import {  getProfile, getPlayerStats } from '../../server/player';
import { statsMap } from '../../helpers/stats';
import { Stats } from '../../interfaces/Stats';
import { IProfile, Player } from '../../interfaces/Player';
import { getCountryFlag } from '../../helpers/country';
import { Rating } from '../../interfaces/Rating';

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
  peace: 0,
  shooting: 0,
  passing: 0,
  dribbling: 0,
  defense: 0,
  physical: 0,
  image: '',
  nationality: ''
};

const Profile: NextPage = ({image, name, stats, profile}: Props) => {

  const [profileState, setProfileState] = useState(initialState);

  useEffect(() => {
    setProfileState({
      overall,
      position,
      flag,
      name: userName,
      defense,
      dribbling,
      passing,
      peace,
      physical,
      shooting,
      image,
      nationality
    });
  }, [])
  

  let parsedStats: Rating;
  let parsedProfile: Player;
  let flag: string;
  let formattedStats: Stats[];


  if(!image || !name || !stats || !profile) {
    return <p>Loading...</p>
  }

  parsedStats = JSON.parse(stats);
  formattedStats = statsMap(parsedStats);
  parsedProfile = JSON.parse(profile);
  flag = getCountryFlag(parsedProfile.nationality);
  
  const { 
    position, 
    nationality, 
    name: userName 
  } = parsedProfile;

  const { 
    overall, 
    defense,
    dribbling,
    passing,
    peace,
    physical,
    shooting
  } = parsedStats;
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PlayerCard 
          className={styles.playerCard} 
          profile={profileState}
        />
        <PlayerRate 
          className={styles.playerStats} 
          stats={formattedStats}
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
