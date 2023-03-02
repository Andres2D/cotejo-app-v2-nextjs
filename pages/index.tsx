import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';

const Home: NextPage = () => {
  return <p>Index page</p>
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req });

  return {
    redirect: {
      destination: session ? '/menu' : '/welcome',
      permanent: false
    }
  }
};

export default Home;
