import type { NextPage } from 'next';
import { 
  Select,
  Input,
  Tag,
  TagLabel,
  Avatar,
  TagCloseButton,
} from '@chakra-ui/react';
import { playersFixture } from '../../../../constants/player-positions';
import { getRandomColorSchema } from '../../../../helpers/styles';
import styles from './players-form.module.css';

const PlayersForm: NextPage = () => {

  const playersSelector = playersFixture.map(p => 
    <option key={p.value} value={p.value}>{p.label}</option>
  );

  const playersAdded = Array.from({length: 10}).map((player, idx) => {
    const color = getRandomColorSchema();
    return (
        <Tag 
          size='lg' 
          colorScheme={color} 
          borderRadius='full'
          key={idx}
          className={styles.player}
        >
          <Avatar
            src='https://bit.ly/sage-adebayo'
            size='xs'
            name='Segun Adebayo'
            ml={-1}
            mr={2}
          />
          <TagLabel>Segun</TagLabel>
          <TagCloseButton />
        </Tag>
    )
  });

  return (
    <section>
      <Select 
        className={styles.selector}
        placeholder='5 vs 5'
        width={'100px'} 
        bgColor='white'
        color='#333'
        size='md'
      >
        {playersSelector}
      </Select>
      <Input 
        className={styles.input}
        placeholder='Player name or email'
        colorScheme='white' 
        width={'50%'} 
        variant='filled' 
        mt='5'
      />
      <div className={styles.players}>
        {playersAdded}
      </div>
    </section>
  );
}

export default PlayersForm;
