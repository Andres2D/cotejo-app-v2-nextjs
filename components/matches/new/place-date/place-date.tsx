import type { NextPage } from 'next';
import {
  Input, InputGroup, InputLeftElement, Text
} from '@chakra-ui/react';
import styles from './place-date.module.css';
import { CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const PlaceDate: NextPage = () => {
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
          />
        </InputGroup>
      </div>
    </div>
    
  );
}

export default PlaceDate;
