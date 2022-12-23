import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getFlagSvg } from 'empty-skull';
import { getSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { Button, useToast } from '@chakra-ui/react';
import styles from './index.module.scss';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import { getProfile, getPlayerStats } from '../../server/player';
import {
  IStats,
  IProfile,
  UpdateProfileRequest,
} from '../../interfaces/Player';
import { calculateAVG } from '../../helpers/stats';
import { updatePlayer } from '../../services/api-configuration';

interface Props {
  image?: string;
  name?: string;
  stats?: string;
  email?: string;
  profile?: string;
}

const initialState: IProfile = {
  overall: 0,
  position: 'CM',
  flag: '',
  name: '',
  image: '',
  nationality: '',
};

const initialStats: IStats = {
  peace: 0,
  shooting: 0,
  passing: 0,
  dribbling: 0,
  defense: 0,
  physical: 0,
};

const Profile: NextPage = ({ image, name, stats, profile, email }: Props) => {
  let parsedStats = JSON.parse(stats || '');
  let parsedProfile = JSON.parse(profile || '');

  //TODO: handle error and loading states
  const { mutate } = useMutation(updatePlayer, {
    onError: () => {
      toast({
        title: 'Error.',
        description: 'Profile could not be updated. Try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Profile updated.',
        description: "Profile has been updated.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  });

  const [profileState, setProfileState] = useState(initialState);
  const [statsState, setStatsState] = useState(initialStats);

  const toast = useToast();

  useEffect(() => {
    setProfileState({
      overall: parsedStats.overall,
      position: parsedProfile.position,
      flag: getFlagSvg(parsedProfile.nationality, true)?.flag,
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
    });
  }, []);

  if (!image || !name || !stats || !profile || !email) {
    return <p>Loading...</p>;
  }

  const updateProfile = (field: string, value: string) => {
    if (field === 'nationality') {
      setProfileState((curr) => {
        return { ...curr, [field]: value, flag: getFlagSvg(value, true)?.flag };
      });
    } else {
      setProfileState((curr) => {
        return { ...curr, [field]: value };
      });
    }
  };

  const updateStats = (stat: string, value: number) => {
    setStatsState((curr) => {
      const newVal = { ...curr, [stat]: value };
      updateProfile('overall', `${calculateAVG(Object.values(newVal))}`);
      return newVal;
    });
  };

  const updatePlayerProfile = async () => {
    const request: UpdateProfileRequest = {
      email,
      overall: profileState.overall,
      name: profileState.name,
      nationality: profileState.nationality,
      position: profileState.position,
      defense: statsState.defense,
      dribbling: statsState.dribbling,
      passing: statsState.passing,
      peace: statsState.peace,
      physical: statsState.physical,
      shooting: statsState.shooting,
    };

    mutate(request);
  }

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
        size="lg"
        colorScheme="brand"
        onClick={updatePlayerProfile}
      >
        Save
      </Button>
    </section>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });
  const { image, name, email } = session?.user;
  const profile = await getProfile(email);
  const stats = await getPlayerStats(email);

  return {
    props: {
      image,
      name,
      email,
      stats: JSON.stringify(stats),
      profile: JSON.stringify(profile),
    },
  };
};

export default Profile;
