import { 
  FormControl, 
  FormLabel, 
  Image, 
  Input, 
  useDisclosure, 
  useToast 
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { MutableRefObject, useEffect, useRef } from 'react';
import ModalAlert from '../../layout/modal-alert';
import { RootState } from '../../../interfaces/State';
import { matchesListActions } from '../../../store/matches-list.slice';
import { updateMatch } from '../../../services/api-configuration';
import { FullMatch } from '../../../interfaces/Match';
import styles from './full-time.module.scss';

const FullTimeModal: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const matchesState = useSelector((state: RootState) => state.matchesList);
  const dispatch = useDispatch();
  const toast = useToast();
  const homeScoreRef = useRef() as MutableRefObject<HTMLInputElement>;
  const awayScoreRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if(matchesState.isFullTime) {
      onOpen();
    }
  }, [matchesState, onOpen]);

  const { mutate } = useMutation(updateMatch, {
    onSuccess: async (response) => {
      if (response.ok) {
        dispatch(matchesListActions.updateMatch(response.data.match));
        dispatch(matchesListActions.setSelectedMatch(undefined));
        handleCloseModal();
        toast({
          title: 'Match updated',
          description: 'You update the match.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Match updated',
          description: 'Something went wrong, please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        dispatch(matchesListActions.setSelectedMatch(undefined));
      }
    },
    onError: () => {
      // TODO: handle error
    },
  });

  const handleUpdateMatch = () => {
    if(homeScoreRef.current.value.trim() === '' || awayScoreRef.current.value.trim() === '' ) {
      return;
    }

    const request: FullMatch = {
      ...matchesState.selectedMatch!,
      fullTime: true,
      homeScore: +homeScoreRef.current.value,
      awayScore: +awayScoreRef.current.value
    };

    mutate(request);
  };
  
  const handleCloseModal = () => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isFullTime', value: false}));
    onClose();
  };

  return (
    <ModalAlert
      isOpen={isOpen}
      onClose={() => handleCloseModal()}
      onContinue={handleUpdateMatch}
      actionColor='green'
      title="Full time - Scores"
      continueLabel="Update"
    >
      <form className={styles.fullTime}>
        <FormControl className={styles.formControl}>
          <Image
            src={matchesState.selectedMatch?.home_team.shield}
            alt={matchesState.selectedMatch?.home_team.name}
            width='50px'
            height='50px'
          />
          <FormLabel
            textAlign={'center'}
            marginInlineEnd={0}
          >
            {matchesState.selectedMatch?.home_team.name}
          </FormLabel>
          <Input width={'16'} type='number' ref={homeScoreRef} />
        </FormControl>
        <FormControl className={styles.formControl}>
          <Image
            src={matchesState.selectedMatch?.away_team.shield}
            alt={matchesState.selectedMatch?.away_team.name}
            width='50px'
            height='50px'
          />
          <FormLabel
            textAlign={'center'}
            marginInlineEnd={0}
          >
            {matchesState.selectedMatch?.away_team.name}
          </FormLabel>
          <Input width={'16'} type='number' ref={awayScoreRef} />
        </FormControl>
      </form>
    </ModalAlert>
  );
}

export default FullTimeModal;
