import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import NewMatch from '../../../components/matches/new/new-match';
import { IPlayerList, Player } from '../../../interfaces/Player';
import { getProfile } from '../../../server/player';
import { createMatchActions } from '../../../store/create-match.slice';

interface Props {
  profile: string;
}

const CreateMatch: NextPage<Props> = ({profile}) => {
  const { 
    _id,
    image,
    name,
    nationality,
    position 
  }: Player = JSON.parse(profile || '');

  const dispatch = useDispatch();

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
