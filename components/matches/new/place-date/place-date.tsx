import type { NextPage } from 'next';
import { CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  FormControl
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createMatchActions } from '../../../../store/create-match.slice';
import styles from './place-date.module.scss';
import { ICreateMatchRequest } from '../../../../interfaces/Match';
import { RootState } from '../../../../interfaces/State';
import * as formations from '../../../../constants/formations-positions'; 
import { createMatch } from '../../../../services/api-configuration';

const playerPositionsMap: { [id: number]: string[] } = {
  8: formations.fourTeam,
  10: formations.fiveTeam,
  12: formations.sixTeam,
  14: formations.sevenTeam,
  16: formations.eightTeam,
  18: formations.nineTeam,
  20: formations.tenTeam,
  22: formations.elevenTeam
};

type Inputs = {
  place: string;
  date: string;
};

const PlaceDate: NextPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const form = useSelector((state: RootState) => state.createMatch);

  //TODO: handle error and loading states
  const { mutate, isLoading } = useMutation(createMatch, {
    onSuccess: () => {
      dispatch(createMatchActions.resetStore());
      router.push('/matches');
    }
  });
  const dispatch = useDispatch();

  const onCreateMatch: SubmitHandler<Inputs> = ({place, date}) => {

    dispatch(createMatchActions.updateInput({input: 'place', value: place}));
    dispatch(createMatchActions.updateInput({input: 'date', value: date}));

    const request: ICreateMatchRequest = {
      date,
      location: place,
      home_team: {
        name: form.home_team_name,
        formation: 't',
        shield: form.home_team_shield
      },
      away_team: {
        name: form.away_team_name,
        formation: 't',
        shield: form.away_team_shield
      },
      home_players: form.home_players.map((player, idx) => {
        return {
          position: playerPositionsMap[form.players_number][idx],
          isCaptain: false,
          player: player._id
        }
      }),
      away_players: form.away_players.map((player, idx) => {
        return {
          position: playerPositionsMap[form.players_number][idx],
          isCaptain: false,
          player: player._id
        }
      })
    }

    mutate(request);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onCreateMatch)}>
      <FormControl 
        className={styles.formControl}
        isInvalid={!!errors.place}>
        <Text className={styles.titleInput}>Place</Text>
        <InputGroup>
          <InputLeftElement
            className={styles.iconInput}
          >
            <InfoOutlineIcon color='gray.300' />
          </InputLeftElement>
          <Input
            className={styles.input}
            type='text'
            placeholder='Anfield'
            size='lg'
            variant='filled'
            {...register('place', {
              required: 'The place name is required'
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.place && errors.place.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl 
        className={styles.formControl}
        isInvalid={!!errors.date}>
        <Text className={styles.titleInput}>Date</Text>
        <InputGroup>
          <InputLeftElement
            className={styles.iconInput}
          >
            <CalendarIcon color='gray.300' />
          </InputLeftElement>
          <Input
            className={styles.input}
            type='date'
            placeholder='Date'
            size='lg'
            variant='filled'
            {...register('date', {
              required: 'The date name is required'
            })}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.date && errors.date.message}
        </FormErrorMessage>
      </FormControl>
      <Button 
        className={styles.nextBtn}
        size='lg'
        mt={10}
        colorScheme='brand'
        type='submit'
        disabled={isLoading}
      >
        Create Match
      </Button>
    </form>
  );
}

export default PlaceDate;
