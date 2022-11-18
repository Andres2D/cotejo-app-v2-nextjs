import { ChangeEvent, MutableRefObject, useRef } from 'react';
import type { NextPage } from 'next';
import { 
  Select,
  Input,
  Tag,
  TagLabel,
  Avatar,
  TagCloseButton,
} from '@chakra-ui/react';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { playersFixture } from '../../../../constants/player-positions';
import { getRandomColorSchema } from '../../../../helpers/styles';
import styles from './players-form.module.css';
import { RootState } from '../../../../interfaces/State';
import { createMatchActions } from '../../../../store/create-match.slice';

const PlayersForm: NextPage = () => {

  const formState = useSelector((state: RootState) => state.createMatch);
  const dispatch = useDispatch();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputSubject: Subject<string> = new Subject();

  // Get player
  inputSubject.pipe(
    debounceTime(2000),
    distinctUntilChanged()
  ).subscribe(async(query: string) => {

    if(!query) {
      return;
    }

    const response = await fetch('/api/player', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'query': query
      }
    });

    if(!response) {
      console.log('unhandled error');
      return;
    }
    const players = await response.json();
    console.log(players);
  });

  const playersSelector = playersFixture.map(p => 
    <option 
      key={p.value} 
      value={p.value} 
      selected={p.value === formState.players_number}
    >
      {p.label}
    </option>
  );

  const removePlayer = (idPlayer: string) => {
    dispatch(createMatchActions.removePlayer(idPlayer));
  };

  const updatePlayersNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    if(!event.target.value) {
      return;
    }

    const value = Number(event.target.value);
    dispatch(createMatchActions.updateInputNumber({input: 'players_number', value}));
  };

  const searchPlayer = () => {
    inputSubject.next(inputRef.current.value);
  };

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
        width={'120px'} 
        bgColor='white'
        color='#333'
        size='md'
        onChange={updatePlayersNumber}
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
        ref={inputRef}
        onChange={searchPlayer}
      />
      <div className={styles.players}>
        {playersAdded}
      </div>
    </section>
  );
}

export default PlayersForm;
