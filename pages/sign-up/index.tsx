import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import SignUpForm from '../../components/sign-up/sign-up-form';
import styles from './index.module.css';
import { RegisterPlayerRequest } from '../../interfaces/Player';

const SignUp: NextPage = () => {

  const registerPlayer = (request: RegisterPlayerRequest) => {
    console.log(request);
  };

  return (
    <div className={styles.signUp}>
      <Image
        src={'/images/app-logo-regular.png'}
        alt='Cotejo app logo'
        width={400}
        height={294}
      ></Image>
      <SignUpForm
        onSignUp={registerPlayer}
      />
      <NextLink href='/auth'>
        <Link className={styles.loginLink}>
          {`Already have an account?, Login`}
        </Link>
      </NextLink>
    </div>
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

export default SignUp;
