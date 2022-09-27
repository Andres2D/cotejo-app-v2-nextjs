import type { NextPage } from 'next';
import { Button } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <>
      <h2>Cotejo App v2</h2>
      <Button colorScheme='green'>Chakra UI installed</Button>
    </>
  );
}

export default Home;
