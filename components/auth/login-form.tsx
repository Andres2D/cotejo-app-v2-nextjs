import { MutableRefObject, useRef } from 'react';
import type { NextPage } from 'next';
import {
  Button,
  FormControl,
  Input,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { signIn } from "next-auth/react";
import GoogleIcon from '../../assets/svg/google.svg';
import styles from './login-form.module.css';
import { validateEmail } from '../../helpers/validation';

const LoginForm: NextPage = () => {

  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const toast = useToast();

  const onLogin = () => {
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(!email || !password || !validateEmail(email)) {
      toast({
        title: 'Error.',
        description: "Invalid login, please check the form values.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      emailRef.current.value = '';
      passwordRef.current.value = '';
      return;
    }

    signIn('credential_user', {email, password});

  };

  return (
    <FormControl className={styles.form}>
      <Input 
        className={styles.input}
        type='email'
        placeholder='Username'
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
        ref={emailRef}
      />
      <Input 
        className={styles.input}
        type='password'
        placeholder='Password' 
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
        ref={passwordRef}
      />
      <div className={styles.actions}>
        <Button 
          className={styles.login}
          size='lg'
          colorScheme='brand'
          onClick={onLogin}
        >
          Login
        </Button>
        <IconButton
          className={styles.google}
          colorScheme='gray'
          aria-label='Call Segun'
          size='lg'
          icon={<GoogleIcon boxSize={8} />}
          onClick={() => signIn()}
        />
      </div>
    </FormControl>
  );
}

export default LoginForm;
