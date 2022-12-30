import { getFlagSvg } from 'empty-skull';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewMatch from '../../../components/matches/new/new-match';
import { IPlayerList, Player } from '../../../interfaces/Player';
import { getProfile } from '../../../server/player';
import { createMatchActions } from '../../../store/create-match.slice';
import { profileActions } from '../../../store/profile.slice';

interface Props {
  profile: string;
}

const CreateMatch: NextPage<Props> = ({profile}) => {

  const dispatch = useDispatch();

  // Persisting store profile
  // TODO: Change way to persis state
  let parsedProfile = JSON.parse(profile || '');

  useEffect(() => {
    dispatch(profileActions.setProfile({
      overall: 0,
      position: parsedProfile.position,
      flag: getFlagSvg(parsedProfile.nationality, true)?.flag,
      name: parsedProfile.name,
      image: parsedProfile.image,
      nationality: parsedProfile.nationality,
    }));
  }, []);

  const { 
    _id,
    image,
    name,
    nationality,
    position 
  }: Player = JSON.parse(profile || '');

  const defaultPlayer: IPlayerList = {
    _id: _id!,
    image,
    name,
    nationality,
    position
  };

  dispatch(createMatchActions.addPlayer(defaultPlayer));

  return (
    <NewMatch />
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req});
  
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  const profile = await getProfile(session?.user?.email!);

  return {
    props: { 
      session,
      profile: JSON.stringify(profile)
    }
  }
};

export default CreateMatch;
