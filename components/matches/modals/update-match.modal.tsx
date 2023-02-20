import { FormControl, FormLabel, Input, useDisclosure, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import ModalAlert from '../../layout/modal-alert';
import { RootState } from '../../../interfaces/State';
import { matchesListActions } from '../../../store/matches-list.slice';
import { updateMatch } from '../../../services/api-configuration';
import { FullMatch } from '../../../interfaces/Match';
import styles from './update-match.module.scss';

const UpdateMatchModal: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const matchesState = useSelector((state: RootState) => state.matchesList);
  const dispatch = useDispatch();
  const toast = useToast();
  const [place, setPlace] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if(matchesState.isUpdateMatch) {
      onOpen();
    }
  }, [matchesState, onOpen]);

  useEffect(() => {
    setPlace(matchesState.selectedMatch?.location!);
    setDate(matchesState.selectedMatch?.date!);
  }, [matchesState]);

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
    if(!date || !location || date?.trim() === '' || place?.trim() === '' ) {
      return;
    }

    const request: FullMatch = {
      ...matchesState.selectedMatch!,
      date: date || matchesState.selectedMatch?.date || '',
      location: place || matchesState.selectedMatch?.location || ''
    };

    mutate(request);
  };
  
  const handleCloseModal = () => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isUpdateMatch', value: false}));
    onClose();
  };

  const inputHandler = (input: string, event: any) => {
    input === 'place' ? setPlace(event.target.value) : setDate(event.target.value);
  };

  return (
    <ModalAlert
      isOpen={isOpen}
      onClose={() => handleCloseModal()}
      onContinue={handleUpdateMatch}
      actionColor='green'
      title={`Update ${matchesState.selectedMatch?.home_team.name} vs ${matchesState.selectedMatch?.away_team.name}`}
      continueLabel="Update"
    >
      <form className={styles.updateMatch}>
        <FormControl className={styles.formControl}>
          <FormLabel
            textAlign={'center'}
            marginInlineEnd={0}
          >
            Place
          </FormLabel>
          <Input type='text' onChange={(event) => inputHandler('place', event)} value={place} />
        </FormControl>
        <FormControl className={styles.formControl}>
          <FormLabel
            textAlign={'center'}
            marginInlineEnd={0}
          >
            Date
          </FormLabel>
          <Input type='date' onChange={(event) => inputHandler('date', event)} value={date} />
        </FormControl>
      </form>
    </ModalAlert>
  );
}

export default UpdateMatchModal;
