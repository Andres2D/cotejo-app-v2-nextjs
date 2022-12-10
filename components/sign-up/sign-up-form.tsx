import { 
  Button, 
  FormControl, 
  FormErrorMessage, 
  Input 
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './sign-up-form.module.scss';
import { RegisterPlayerRequest } from '../../interfaces/Player';

type Inputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

interface Props {
  onSignUp: (request: RegisterPlayerRequest) => void;
}

const SignUpForm: NextPage<Props> = ({ onSignUp }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const signUp: SubmitHandler<Inputs> = ({ 
    email,
    name,
    password
   }) => {
    const registerRequest: RegisterPlayerRequest = {
      email,
      name,
      password,
    };
    onSignUp(registerRequest);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(signUp)}>
      <FormControl 
        className={styles.control}
        isInvalid={!!errors.email}>
        <Input
          className={styles.input}
          type="email"
          placeholder="Email"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('email', {
            required: 'Email is required',
          })}
          id="emailRef"
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl 
        className={styles.control}
        isInvalid={!!errors.name}>
        <Input
          className={styles.input}
          type="text"
          placeholder="Name"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('name', {
            required: 'Name is required',
          })}
          id="nameRef"
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl 
        className={styles.control}
        isInvalid={!!errors.password}>
        <Input
          className={styles.input}
          type="password"
          placeholder="Password"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('password', {
            required: 'Password is required',
          })}
          id="passwordRef"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl 
        className={styles.control}
        isInvalid={!!errors.confirmPassword}>
        <Input
          className={styles.input}
          type="password"
          placeholder="Confirm password"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('confirmPassword', {
            required: 'Password confirmation is required',
            validate: v => v === getValues('password') || 'Passwords must match'
          })}
          id="confirmPasswordRef"
        />
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        className={styles.btnSignUp}
        size="lg"
        colorScheme="brand"
        type='submit'
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
