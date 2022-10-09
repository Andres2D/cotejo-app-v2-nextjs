import type { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import styles from './index.module.css';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import { getSession } from 'next-auth/react';
import getPlayerStats from '../../server/player';
import { statsMap } from '../../helpers/stats';
import { Stats } from '../../interfaces/Stats';

interface Props {
  image?: string;
  name?: string;
  stats?: string;
}

const Profile: NextPage = ({image, name, stats}: Props) => {

  let parsedStats: Stats[];
  let overall = 0;
  
  if(!image || !name || !stats) {
    return <p>Loading...</p>
  }

  parsedStats = JSON.parse(stats);
  overall = parsedStats.filter(a => a.label === 'Overall')[0].value;
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PlayerCard 
          className={styles.playerCard} 
          image={image}
          name={name}
          overall={overall} 
        />
        <PlayerRate 
          className={styles.playerStats} 
          stats={parsedStats}
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
  const stats = await getPlayerStats(email);

  let formattedStats;
  if(stats) {
    formattedStats = statsMap(stats);
  }
  
  return {
    props: {
      image, 
      name,
      stats: JSON.stringify(formattedStats)
    }
  }
};

export default Profile;
