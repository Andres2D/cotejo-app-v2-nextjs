import {
  Button,
  FormControl,
  Input,
  IconButton
} from '@chakra-ui/react';
import GoogleIcon from '../../assets/svg/google.svg';
import type { NextPage } from 'next';
import styles from './login-form.module.css';

const LoginForm: NextPage = () => {
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
      />
      <Input 
        className={styles.input}
        type='password'
        placeholder='Password' 
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
      />
      <div className={styles.actions}>
        <Button 
          className={styles.login}
          size='lg'
          colorScheme='brand'
        >
          Login
        </Button>
        <IconButton
          className={styles.google}
          colorScheme='gray'
          aria-label='Call Segun'
          size='lg'
          icon={<GoogleIcon boxSize={8} />}
        />
      </div>
    </FormControl>
  );
}

export default LoginForm;
