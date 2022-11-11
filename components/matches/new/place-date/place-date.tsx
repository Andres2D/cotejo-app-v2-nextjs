import type { NextPage } from 'next';
import {
  Input, InputGroup, InputLeftElement, Text
} from '@chakra-ui/react';
import styles from './place-date.module.css';
import { CalendarIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const PlaceDate: NextPage = () => {
  return (
    <div className={styles.form}>
      <div>
        <Text className={styles.titleInput}>Place</Text>
        <InputGroup>
          <InputLeftElement
            className={styles.iconInput}
            children={<InfoOutlineIcon color='gray.300' />}
          />
          <Input
             className={styles.input}
             type='text'
             placeholder='Anfield'
             htmlSize={30} 
             width='auto'
             size='lg'
             variant='filled'
          />
        </InputGroup>
      </div>
      <div>
        <Text className={styles.titleInput}>Date</Text>
        <InputGroup>
          <InputLeftElement
            className={styles.iconInput}
            children={<CalendarIcon color='gray.300' />}
          />
          <Input
            className={styles.input}
            type='text'
            placeholder='Date'
            htmlSize={30} 
            width='auto'
            size='lg'
            variant='filled'
          />
        </InputGroup>
      </div>
    </div>
    
  );
}

export default PlaceDate;
