import type { NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link, useToast } from '@chakra-ui/react';
import SignUpForm from '../../components/sign-up/sign-up-form';
import styles from './index.module.css';
import { RegisterPlayerRequest } from '../../interfaces/Player';

const SignUp: NextPage = () => {

  const toast = useToast();

  const registerPlayer = async(request: RegisterPlayerRequest) => {
    const response = await fetch('api/player', {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if(!response.ok) {
      toast({
        title: 'Error.',
        description: "Profile could not be created. Try again later.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    await response.json();
    toast({
      title: 'Profile created.',
      description: "Profile has been created.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    
    signIn('credential_user', {email: request.email, password: request.password});
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
