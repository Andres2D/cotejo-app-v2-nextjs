
import { Button, Image } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { getFlagSvg } from 'empty-skull';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './menu.module.scss';
import { getProfile } from '../../server/player';
import { profileActions } from '../../store/profile.slice';
import HeaderSettings from '../../accessibility/header-setting';

interface Props {
  profile: string;
}

const Menu: NextPage<Props> = ({profile}) => {

  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  // Persisting store profile
  // TODO: Change way to persis state
  let parsedProfile = JSON.parse(profile || '');
  const flagResponse = getFlagSvg(parsedProfile.nationality, true);

  useEffect(() => {
    dispatch(profileActions.setProfile({
      _id: parsedProfile._id,
      overall: 0,
      position: parsedProfile.position,
      flag: Array.isArray(flagResponse) ? flagResponse[0].flag : flagResponse.flag,
      name: parsedProfile.name,
      image: parsedProfile.image,
      nationality: parsedProfile.nationality,
    }));
  }, []);

  if(!session) {
    <p>Loading</p>
  }

  return (
    <>
      <HeaderSettings title='Menu' description='Go to your profile or open the matches list' />
      <div className={styles.container}>
        <Image
          className={styles.logo}
          src={'/images/app-logo-regular.png'}
          alt='Cotejo app logo'
          width={325}
          height={219}
        ></Image>
        <div className={styles.actions}>
          <Button 
            className={styles.btnOptionMenu}
            size='lg'
            colorScheme='brand'
            onClick={() => router.push('/profile')}
          >
            Profile
          </Button>
        </div>
        <div className={styles.actions}>
          <Button 
            className={styles.btnOptionMenu}
            size='lg'
            colorScheme='brand'
            onClick={() => router.push('/matches')}
          >
            Matches
          </Button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req});

  if(!session || !session.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  const { email } = session.user;
  const profile = await getProfile(email!);
  
  return {
    props: { 
      session, 
      profile: JSON.stringify(profile), 
    }
  }
};

export default Menu;
