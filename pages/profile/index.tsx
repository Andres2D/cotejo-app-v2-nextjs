import type { NextPage } from 'next';
import { getFlagSvg } from 'empty-skull';
import { getSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import { Button, useToast } from '@chakra-ui/react';
import styles from './index.module.scss';
import PlayerCard from '../../components/profile/player-card';
import PlayerRate from '../../components/profile/player-rate';
import { getProfile, getPlayerStats } from '../../server/player';
import { profileActions } from '../../store/profile.slice';
import { updatePlayer } from '../../services/api-configuration';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfileRequest } from '../../interfaces/Player';
import { RootState } from '../../interfaces/State';
import { useEffect } from 'react';

interface Props {
  image?: string;
  name?: string;
  stats?: string;
  email?: string;
  profile?: string;
}

const Profile: NextPage = ({ image, name, stats, profile, email }: Props) => {

  const { profile: profileState, stats: statsState } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const toast = useToast();

  let parsedStats = JSON.parse(stats || '');
  let parsedProfile = JSON.parse(profile || '');

  useEffect(() => {
    dispatch(profileActions.setProfile({
      overall: parsedStats.overall,
      position: parsedProfile.position,
      flag: getFlagSvg(parsedProfile.nationality, true)?.flag,
      name: parsedProfile.name,
      image: parsedProfile.image,
      nationality: parsedProfile.nationality,
    }));
  
    dispatch(profileActions.setStats({
      defense: parsedStats.defense,
      dribbling: parsedStats.dribbling,
      passing: parsedStats.passing,
      peace: parsedStats.peace,
      physical: parsedStats.physical,
      shooting: parsedStats.shooting,
    }));
  }, [])
  

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

  if (!image || !name || !stats || !profile || !email) {
    return <p>Loading...</p>;
  }

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
      image: profileState?.image || ''
    };

    mutate(request);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <PlayerCard className={styles.playerCard} />
        <PlayerRate className={styles.playerStats} />
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
