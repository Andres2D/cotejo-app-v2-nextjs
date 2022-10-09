import type { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

const Home: NextPage = () => {
  
  return (
    <>
      <h2>Cotejo App v2</h2>
      <Button colorScheme='red'>Chakra UI installed</Button>
    </>
  );
}

export const getStaticProps = async(context: any) => {
  const session = await getSession({ req: context.req });

  return {
    redirect: {
      destination: session ? '/menu' : '/auth',
      permanent: false
    }
  }
};

export default Home;
