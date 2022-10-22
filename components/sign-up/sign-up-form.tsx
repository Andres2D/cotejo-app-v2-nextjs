import { useRef, MutableRefObject } from 'react';
import {
  Button,
  FormControl,
  Input,
  useToast
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import styles from './sign-up-form.module.css';
import { validateEmail } from '../../helpers/validation';
import { RegisterPlayerRequest } from '../../interfaces/Player';

interface Props {
  onSignUp: (request: RegisterPlayerRequest) => void;
}

const SignUpForm: NextPage<Props> = ({onSignUp}) => {

  const toast = useToast();
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const signUp = () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if(
      !email ||
      !name ||
      !password ||
      !confirmPassword ||
      !validateEmail(email) ||
      password !== confirmPassword
    ) {
      toast({
        title: 'Error.',
        description: "Invalid form, please check the form values.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return;
    }

    const registerRequest: RegisterPlayerRequest = {
      email,
      name,
      password
    }
    onSignUp(registerRequest);
  }

  return (
    <FormControl className={styles.form}>
      <Input 
        className={styles.input}
        type='email'
        placeholder='Email'
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
        ref={emailRef}
      />
      <Input 
        className={styles.input}
        type='text'
        placeholder='Name'
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
        ref={nameRef}
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
      <Input 
        className={styles.input}
        type='password'
        placeholder='Confirm password' 
        htmlSize={30} 
        width='auto'
        size='lg'
        variant='filled'
        ref={confirmPasswordRef}
      />
      <Button 
        onClick={signUp}
        className={styles.btnSignUp}
        size='lg'
        colorScheme='brand'
      >
        Sign up
      </Button>
    </FormControl>
  );
}

export default SignUpForm;
