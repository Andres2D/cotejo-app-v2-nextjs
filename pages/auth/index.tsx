import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './index.module.css';
import LoginForm from '../../components/auth/login-form';

const Login: NextPage = () => {
  return (
    <div className={styles.login}>
      <Image
        src={'/images/app-logo-regular.png'}
        alt='Cotejo app logo'
        width={400}
        height={294}
      ></Image>
      <LoginForm />
    </div>
  );
}

export default Login;
