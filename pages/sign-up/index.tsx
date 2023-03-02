import type { NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { useMutation } from 'react-query';
import { Link, useToast, Image } from '@chakra-ui/react';
import SignUpForm from '../../components/sign-up/sign-up-form';
import styles from './index.module.scss';
import { RegisterPlayerRequest } from '../../interfaces/Player';
import { registerPlayer } from '../../services/api-configuration';
import HeaderSettings from '../../accessibility/header-setting';
import AuthWrapper from '../../components/logo-wrapper/logo-wrapper';

const SignUp: NextPage = () => {

  const toast = useToast();
  let requestData: RegisterPlayerRequest;
  const { mutate } = useMutation(registerPlayer, {
    onError: () => {
      toast({
        title: 'Error.',
        description: "Profile could not be created. Try again later.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Profile created.',
        description: "Profile has been created.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      signIn('credential_user', {email: requestData?.email, password: requestData?.password});
    }
  });

  const registerPlayerHandler = async(request: RegisterPlayerRequest) => {
    requestData = request;
    mutate(request);
  }

  return (
    <>
      <HeaderSettings title='SignUp' description='Create a new account' />
        <AuthWrapper>
          <>
            <SignUpForm
              onSignUp={registerPlayerHandler}
            />
            <NextLink href='/auth'>
              <Link className={styles.loginLink}>
                {`Already have an account?, Login`}
              </Link>
            </NextLink>
          </>
        </AuthWrapper>
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

export default SignUp;
