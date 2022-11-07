import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Provider } from 'react-redux';
import NewMatch from '../../../components/matches/new/new-match';
import store from '../../../store';

const CreateMatch: NextPage = () => {

  return (
    <Provider store={store}>
      <NewMatch />
    </Provider>
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
