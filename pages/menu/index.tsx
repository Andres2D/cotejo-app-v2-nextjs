import type { NextPage } from 'next';
import { getSession, useSession, signOut } from "next-auth/react";
import { Button } from '@chakra-ui/react';
import Image from 'next/image';

const Menu: NextPage = () => {

  const { data: session } = useSession();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <>
      <h1>Hello, {session?.user?.name}</h1>
      <Image 
        src={session?.user?.image || '/images/user-image-fallback.png'}
        alt='User Image'
        width={200}
        height={200}
      />
      <Button
        colorScheme='red'
        onClick={() => signOut()}  
      >
        Logout
      </Button>
    </>
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

export default Menu;
