
import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './menu.module.css';

const Menu: NextPage = () => {

  const { data: session } = useSession();
  const router = useRouter();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <div className={styles.container}>
      <Image
        src={'/images/app-logo-regular.png'}
        alt='Cotejo app logo'
        width={400}
        height={294}
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
          Matchs
        </Button>
      </div>
    </div>
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
