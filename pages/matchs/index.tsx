
import { Button } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons'
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './matchs.module.css';

const Menu: NextPage = () => {

  const { data: session } = useSession();
  const router = useRouter();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <div className={styles.container}>
      <div>
        <Image
          src={'/images/liverpool-fc-logo.png'}
          alt='Local team logo'
          width={150}
          height={180}
          className={styles.logoShadow}
        ></Image>
        <div className={styles.nameTeam}>
          <h2>Liverpool</h2>
        </div>
      </div>

      <div className={styles.containerVS}>
        <Image
          src={'/images/vs-icon.png'}
          alt='Icon versus'
          width={56}
          height={49}
          className={styles.logoShadow}
        ></Image>
         <div>
          <h2>25 Sep 2022</h2>
          <h2>Anfield</h2>
        </div>
      </div>

      <div>
        <Image
          src={'/images/chelsea-fc-logo.png'}
          alt='Visiting team logo'
          width={150}
          height={180}
          className={styles.logoShadow}
        ></Image>
        <div className={styles.nameTeam}>
          <h2>Chelsea</h2>
        </div>
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
        <SettingsIcon w={7} h={7} color="gray.600" />
        </div>
        <div className={styles.option}>
        <DeleteIcon w={7} h={7} color="red.600" />
        </div>
      </div>


      <div className={styles.footer}>
        <Button 
          className={styles.btnNewMatch}
          size='lg'
          colorScheme='brand'
        >
          New Match
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
