import { Image } from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './logo-wrapper.module.scss';

interface Props {
  children: JSX.Element;
}

const LogoWrapper: NextPage<Props> = ({children}) => {
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

export default LogoWrapper;
