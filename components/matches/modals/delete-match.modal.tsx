import { useDisclosure, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import ModalAlert from '../../layout/modal-alert';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../interfaces/State';
import { useEffect } from 'react';
import { matchesListActions } from '../../../store/matches-list.slice';
import { useMutation } from 'react-query';
import { deleteMatch } from '../../../services/api-configuration';

const DeleteMatchModal: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const matchesState = useSelector((state: RootState) => state.matchesList);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if(matchesState.isDeleteMatch) {
      onOpen();
    }
  }, [matchesState, onOpen]);

  const { mutate } = useMutation(deleteMatch, {
    onSuccess: async (response) => {
      if (response.ok) {
        dispatch(matchesListActions.deleteLeaveMatch({id: matchesState.selectedMatch?._id!}));
        dispatch(matchesListActions.setSelectedMatch(undefined));
        handleCloseModal();
        toast({
          title: 'Delete match',
          description: 'Match deleted.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Delete match',
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

  const handleDeleteMatch = () => {
    mutate(matchesState.selectedMatch?._id!);
  };
  
  const handleCloseModal = () => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isDeleteMatch', value: false}));
    onClose();
  };

  return (
    <ModalAlert
      isOpen={isOpen}
      onClose={() => handleCloseModal()}
      onContinue={handleDeleteMatch}
      title="Delete Match"
      description={`Are you sure? You can't undo this action afterwards`}
    />
  );
}

export default DeleteMatchModal;
