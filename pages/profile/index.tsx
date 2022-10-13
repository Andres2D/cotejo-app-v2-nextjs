import type { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import { getSession } from 'next-auth/react';
import {  getProfile, getPlayerStats } from '../../server/player';
import { statsMap } from '../../helpers/stats';
import { Stats } from '../../interfaces/Stats';
import { Player } from '../../interfaces/Player';
import { getCountryFlag } from '../../helpers/country';
import { Rating } from '../../interfaces/Rating';

interface Props {
  image?: string;
  name?: string;
  stats?: string;
  profile?: string;
}

const Profile: NextPage = ({image, name, stats, profile}: Props) => {

  let parsedStats: Rating;
  let parsedProfile: Player;
  let flag: string;
  let overall = 0;
  let formattedStats: Stats[];
  
  if(!image || !name || !stats || !profile) {
    return <p>Loading...</p>
  }

  parsedStats = JSON.parse(stats);
  formattedStats = statsMap(parsedStats);
  parsedProfile = JSON.parse(profile);
  overall = parsedStats.overall;
  flag = getCountryFlag(parsedProfile.nationality);
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PlayerCard 
          className={styles.playerCard} 
          profile={parsedProfile}
          overall={overall}
          flag={flag}
          stats={parsedStats}
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
