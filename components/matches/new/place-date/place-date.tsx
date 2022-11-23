import type { NextPage } from 'next';
import { CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { MutableRefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input, InputGroup, InputLeftElement, Text
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createMatchActions } from '../../../../store/create-match.slice';
import styles from './place-date.module.css';
import useRequest from '../../../../hooks/use-request';
import { ICreateMatchRequest } from '../../../../interfaces/Match';
import { RootState } from '../../../../interfaces/State';

const PlaceDate: NextPage = () => {

  const placeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const router = useRouter();
  const form = useSelector((state: RootState) => state.createMatch);
  const {
    error,
    isLoading,
    sendRequest
  } = useRequest();
  const dispatch = useDispatch();

  const createMatch = () => {
    const place = placeRef.current.value;
    const date = dateRef.current.value;

    if(!place || !date) {
      return;
    }

    dispatch(createMatchActions.updateInput({input: 'place', value: place}));
    dispatch(createMatchActions.updateInput({input: 'date', value: date}));

    const request: ICreateMatchRequest = {
      date: form.date,
      location: form.place,
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
      home_players: form.home_players.map(player => {
        return {
          position: player.position,
          isCaptain: false,
          player: player._id
        }
      }),
      away_players: form.away_players.map(player => {
        return {
          position: player.position,
          isCaptain: false,
          player: player._id
        }
      })
    }

    sendRequest({
      url: '/api/match',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }, createMatchHandler)

  };

  const createMatchHandler = (response: any) => {
    console.log('match created');
    console.log(response);
    dispatch(createMatchActions.resetStore());
    router.push('/matches');
  }

  return (
    <div className={styles.form}>
      <div className={styles.formControl}>
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
            ref={placeRef}
          />
        </InputGroup>
      </div>
      <div className={styles.formControl}>
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
            ref={dateRef}
          />
        </InputGroup>
      </div>
      <Button 
        className={styles.nextBtn}
        size='lg'
        mt={10}
        colorScheme='brand'
        onClick={createMatch}
        disabled={isLoading}
      >
        Create Match
      </Button>
    </div>
  );
}

export default PlaceDate;
