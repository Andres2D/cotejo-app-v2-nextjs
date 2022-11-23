import type { NextPage } from 'next';
import { CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { MutableRefObject, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Input, InputGroup, InputLeftElement, Text
} from '@chakra-ui/react';
import { createMatchActions } from '../../../../store/create-match.slice';
import styles from './place-date.module.css';

const PlaceDate: NextPage = () => {

  const placeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch();

  const createMatch = () => {
    const place = placeRef.current.value;
    const date = dateRef.current.value;

    if(!place || !date) {
      return;
    }

    dispatch(createMatchActions.updateInput({input: 'place', value: place}));
    dispatch(createMatchActions.updateInput({input: 'date', value: date}));
  };

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
      >
        Create Match
      </Button>
    </div>
  );
}

export default PlaceDate;
