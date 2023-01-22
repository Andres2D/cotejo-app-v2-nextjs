import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { getFlagSvg } from 'empty-skull';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MatchList from '../../components/matches/match-list';
import { getMatches } from '../../server/matches';
import styles from './matches.module.scss';
import { FullMatch, IMatch } from '../../interfaces/Match';
import { profileActions } from '../../store/profile.slice';
import { getProfile } from '../../server/player';
import HeaderSettings from '../../accessibility/header-setting';

interface Props {
  matches: string;
  profile: string;
}

const Matches: NextPage<Props> = ({matches, profile}) => {

  const matchesList: FullMatch[] = JSON.parse(matches);
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

  return (
    <>
      <HeaderSettings title='Matches' description='Select your match' />
      <section className={styles.matches}>
        <Button 
          size='lg'
          colorScheme='brand'
          onClick={() => router.push('/matches/new')}
        >
          New Match
        </Button>
        <MatchList
          matches={matchesList}
        />
      </section>
    </>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req});
  let matches: IMatch[] = [];

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
  matches = await getMatches(session.user?.email!) || [];

  return {
    props: {
      matches: JSON.stringify(matches),
      profile: JSON.stringify(profile)
    }
  }
};

export default Matches;
