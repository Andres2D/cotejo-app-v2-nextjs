import { Image } from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './auth-wrapper.module.scss';

interface Props {
  children: JSX.Element;
}

const AuthWrapper: NextPage<Props> = ({children}) => {
  return (
    <div className={styles.login}>
      <Image
        src={'/images/fit-logo.png'}
        alt='Cotejo app logo'
        width={320}
        height={200}
        className={styles.logo}
      />
      {children}
    </div>
  );
};

export default AuthWrapper;
