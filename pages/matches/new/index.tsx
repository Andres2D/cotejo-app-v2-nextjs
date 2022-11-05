import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import NewMatch from '../../../components/matches/new/new-match';
import styles from './new.module.css';

const CreateMatch: NextPage = () => {

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

  return {
    props: { session }
  }
};

export default CreateMatch;
