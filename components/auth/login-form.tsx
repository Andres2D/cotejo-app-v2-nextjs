import type { NextPage } from 'next';
import {
  Button,
  FormControl,
  Input,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import GoogleIcon from '../../assets/svg/google.svg';
import styles from './login-form.module.scss';
import { emailValidationPattern } from '../../constants/form';

type Inputs = {
  userName: string;
  password: string;
};

const LoginForm: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onLogin: SubmitHandler<Inputs> = ({ userName, password }) => {
    signIn('credential_user', {email: userName, password});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
      <FormControl className={styles.control} isInvalid={!!errors.userName}>
        <Input
          type="email"
          placeholder="Username"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('userName', {
            required: 'The user name is required',
            pattern: emailValidationPattern
          })}
          id="userName"
        />
        <FormErrorMessage>
          {errors.userName && errors.userName.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl className={styles.control} isInvalid={!!errors.password}>
        <Input
          type="password"
          placeholder="Password"
          htmlSize={30}
          width="auto"
          size="lg"
          variant="filled"
          {...register('password', {
            required: 'The password is required',
          })}
          id="password"
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <div className={styles.actions}>
        <Button
          className={styles.login}
          size="lg"
          colorScheme="brand"
          type="submit"
        >
          Login
        </Button>
        <IconButton
          className={styles.google}
          colorScheme="gray"
          aria-label="Call Segun"
          size="lg"
          icon={<GoogleIcon boxSize={8} />}
          onClick={() => signIn('google_user')}
        />
      </div>
    </form>
  );
};

export default LoginForm;
