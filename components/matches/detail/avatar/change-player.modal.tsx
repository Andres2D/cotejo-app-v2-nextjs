import { 
  Avatar,
  Badge,
  Box,
  Button, 
  Flex, 
  Heading, 
  Image, 
  Input, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent,
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text, 
  useDisclosure 
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState, useRef, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import useRequest from '../../../../hooks/use-request';
import { IMatchPlayer, IPlayerList } from '../../../../interfaces/Player';
import { RootState } from '../../../../interfaces/State';
import { matchDetailsActions } from "../../../../store/match-details.slice";
import styles from './change-player.modal.module.scss';

const ChangePlayerModal: NextPage = () => {

  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.matchDetails);
  const { onClose } = useDisclosure();
  const [ inPlayer, setInPlayer ] = useState<IPlayerList>();
  const [ playersSearch, setPlayersSearch ] = useState([]);
  const { 
    isLoading,
    sendRequest
  } = useRequest();

  const inputSubject: Subject<string> = new Subject();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

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
    console.log(data);
    const basePlayersId = [...details.home, ...details.away].map(p => p.player._id);
    // TODO: Add types
    const filteredPlayers = data.players.filter((p: any) => !basePlayersId.includes(p._id))
    setPlayersSearch(filteredPlayers);
  };

  const searchPlayer = () => {
    inputSubject.next(inputRef.current.value);
  };

  const closeChangePlayerHandler = () => {
    dispatch(matchDetailsActions.toggleChangePlayerModal());
  };

  const getOutPlayer = (): IMatchPlayer => {
    return  [...details.home, ...details.away]
      .filter(p => p.player._id === details.playersSelected[0]?.playerId)[0]?.player;
  }

  const setChangePlayer = (player: IPlayerList) => {
    setInPlayer(player);
    inputRef.current.value = player.name;
    setPlayersSearch([]);
  };

  const changePlayerHandler = () => {
    if(!inPlayer) { 
      return;
    }
    dispatch(matchDetailsActions.replacePlayer(inPlayer));
    dispatch(matchDetailsActions.toggleChangePlayerModal());
  };

  const playersResults = playersSearch.map((player: IPlayerList) => {
    return (
      <Flex
        onClick={() => setChangePlayer(player)}
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

  return (
    <Modal 
      closeOnOverlayClick={false} 
      isOpen={details.changePlayerModalActive} 
      onClose={onClose}
      variant={'brand'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change player</ModalHeader>
        <ModalCloseButton 
          onClick={closeChangePlayerHandler}
        />
        <ModalBody pb={6} className={styles.container}>
          <div className={styles.playerAction}>
            <Avatar
              size='lg'
              name={ getOutPlayer()?.name } 
              src={ getOutPlayer()?.image || 'https://bit.ly/tioluwani-kolawole'}
            />
            <Heading as='h1' size='lg' noOfLines={1}>
              { getOutPlayer()?.name }
            </Heading>
            <Image 
              src='/images/out.svg'
              alt='in-signal'
              width={20}
            />
          </div>
          <div className={styles.playerAction}>
            <Avatar
              size='lg'
              src={inPlayer?.image || 'https://bit.ly/broken-link'}
            />
            <div className={styles.inputChange}>
              <Input
                placeholder='Player name or email'
                colorScheme='white'
                variant='filled' 
                className={styles.inputPlayer}
                ref={inputRef}
                onChange={searchPlayer}
              />
              <div className={styles.resultList}>
                {playersResults}
              </div>
            </div>
            <Image 
              src='/images/in.svg'
              width={20}
              alt='out-signal'
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme='brand' 
            mr={3}
            onClick={changePlayerHandler}
          >
            Change
          </Button>
          <Button onClick={closeChangePlayerHandler}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChangePlayerModal;
