import type { NextPage } from 'next';
import { 
  Select,
  Input,
  Tag,
  TagLabel,
  Avatar,
  TagCloseButton,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { playersFixture } from '../../../../constants/player-positions';
import { getRandomColorSchema } from '../../../../helpers/styles';
import styles from './players-form.module.css';
import { RootState } from '../../../../interfaces/State';
import { createMatchActions } from '../../../../store/create-match.slice';

const PlayersForm: NextPage = () => {

  const formState = useSelector((state: RootState) => state.createMatch);
  const dispatch = useDispatch();

  const playersSelector = playersFixture.map(p => 
    <option key={p.value} value={p.value}>{p.label}</option>
  );

  const removePlayer = (idPlayer: string) => {
    dispatch(createMatchActions.removePlayer(idPlayer));
  }

  const playersAdded = [...formState.away_players, ...formState.home_players].map((player, idx) => {
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
            src={player.image}
            size='xs'
            name={player.name}
            ml={-1}
            mr={2}
          />
          <TagLabel>{player.name}</TagLabel>
          <TagCloseButton onClick={() => removePlayer(player._id)} />
        </Tag>
    )
  });

  return (
    <section>
      <Select 
        className={styles.selector}
        placeholder='Select an option'
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
