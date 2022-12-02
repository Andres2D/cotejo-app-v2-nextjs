import { 
  ChangeEvent, 
  MutableRefObject, 
  useRef, 
  useState 
} from 'react';
import type { NextPage } from 'next';
import { 
  Select,
  Input,
  Tag,
  TagLabel,
  Avatar,
  TagCloseButton,
  Flex,
  Box,
  Text,
  Badge,
  Button,
} from '@chakra-ui/react';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { useDispatch, useSelector } from 'react-redux';
import { playersFixture } from '../../../../constants/player-positions';
import { getRandomColorSchema } from '../../../../helpers/styles';
import styles from './players-form.module.scss';
import { RootState } from '../../../../interfaces/State';
import { createMatchActions } from '../../../../store/create-match.slice';
import { IPlayerList } from '../../../../interfaces/Player';
import useRequest from '../../../../hooks/use-request';

const PlayersForm: NextPage = () => {

  const [ playersSearch, setPlayersSearch ] = useState([]);
  const formState = useSelector((state: RootState) => state.createMatch);
  const dispatch = useDispatch();
  const { 
    isLoading,
    sendRequest
  } = useRequest();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const inputSubject: Subject<string> = new Subject();
  const missingState = formState.players_number;

  // Get player
  inputSubject.pipe(
    debounceTime(2000),
    distinctUntilChanged()
  ).subscribe(async(query: string) => {

    if(!query) {
      return;
    }

    sendRequest({
      url: '/api/player',
      headers: {
        'Content-Type': 'application/json',
        'query': query
      }
    }, playersSearchHandler);
  });

  const playersSearchHandler = (data: any) => {
    setPlayersSearch(data.players)
  };

  const playersSelector = playersFixture.map(p => 
    <option 
      key={p.value} 
      value={p.value} 
      selected={p.value === formState.players_number}
    >
      {p.label}
    </option>
  );

  const addPlayer = (player: IPlayerList) => {
    dispatch(createMatchActions.addPlayer(player));
    inputRef.current.value = '';
    setPlayersSearch([]);
  };

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

  const autoCompletePlayers = () => {
    dispatch(createMatchActions.autoCompletePlayers());
  };

  const playersResults = playersSearch.map((player: IPlayerList) => {
    return (
      <Flex
        onClick={() => addPlayer(player)}
        key={player._id} 
        className={styles.playerResult}>
        <Avatar src={player.image} />
        <Box ml='3'>
          <Text fontWeight='bold'>
            {player.name}
            <Badge ml='1' colorScheme='green'>
              {player.position}
            </Badge>
          </Text>
          <Text fontSize='sm'>{player.nationality}</Text>
        </Box>
      </Flex>
    )
  });

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
        width={'120px'} 
        bgColor='white'
        color='#333'
        size='md'
        onChange={updatePlayersNumber}
      >
        {playersSelector}
      </Select>
      <Input
        placeholder='Player name or email'
        colorScheme='white' 
        width={'50%'} 
        variant='filled' 
        mt='5'
        ref={inputRef}
        onChange={searchPlayer}
      />
      {playersResults}
      <div className={styles.players}>
        {playersAdded}
      </div>
      <Button
        size='lg'
        colorScheme='brand'
        mt='5px'
        onClick={autoCompletePlayers}
      >
        Auto complete players ({missingState - playersAdded.length})
      </Button>
    </section>
  );
}

export default PlayersForm;
