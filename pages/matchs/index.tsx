
import { Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons'
import type { NextPage } from 'next';
import { getSession, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './matchs.module.css';
import Team from '../../components/match/team';

const Menu: NextPage = () => {

  const { data: session } = useSession();
  const router = useRouter();

  if(!session) {
    <p>Loading</p>
  }

  return (
    <div className={styles.container}>
      <Team
        name={'Liverpool'}
        image={'/images/liverpool-fc-logo.png'}
        width={150}
        height={180}
      />

      <div className={styles.containerVS}>
        <Image
          src={'/images/vs-icon.png'}
          alt='Icon versus'
          width={100}
          height={80}
          className={styles.logoShadow}
        ></Image>
         <div>
          <h2>25 Sep 2022</h2>
          <h2>Anfield</h2>
        </div>
      </div>

      <Team
        name={'Liverpool'}
        image={'/images/liverpool-fc-logo.png'}
        width={150}
        height={180}
      />

      <div className={styles.options}>
        <div className={styles.option}>
          <IconButton
            colorScheme='blackAlpha'
            size='lg'
            aria-label='Edit match'
            icon={<SettingsIcon />}
          />
        </div>
        <div className={styles.option}>
        <IconButton
            colorScheme='red'
            size='lg'
            aria-label='Deleted match'
            icon={<DeleteIcon />}
          />
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

  // if(!session) {
  //   return {
  //     redirect: {
  //       destination: '/auth',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: { session }
  }
};

export default Menu;
