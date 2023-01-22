import type { NextPage } from 'next';
import NextLink from "next/link";
import { Link, Image } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import styles from './index.module.scss';
import LoginForm from '../../components/auth/login-form';
import HeaderSettings from '../../accessibility/header-setting';

const Login: NextPage = () => {
  return (
    <>
      <HeaderSettings title='Login' description='Login to CotejoApp' />
      <div className={styles.login}>
        <Image
          src={'/images/app-logo-regular.png'}
          alt='Cotejo app logo'
          width={325}
          height={219}
          className={styles.logo}
        />
        <LoginForm />
        <NextLink href='/sign-up'>
          <Link className={styles.signUpLink}>
            {`Don't have an account?, Sign up`}
          </Link>
        </NextLink>
      </div>
    </>
  );
}

export const getServerSideProps = async(context: any) => {
  const session = await getSession({ req: context.req });

  if(session) {
    return {
      redirect: {
        destination: '/menu',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
};

export default Login;
