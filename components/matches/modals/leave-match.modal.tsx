import { useDisclosure, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ModalAlert from '../../layout/modal-alert';
import { RootState } from '../../../interfaces/State';
import { matchesListActions } from '../../../store/matches-list.slice';
import { leaveMatch } from '../../../services/api-configuration';

const LeaveMatchModal: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const matchesState = useSelector((state: RootState) => state.matchesList);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if(matchesState.isLeaveMatch) {
      onOpen();
    }
  }, [matchesState, onOpen]);

  const { mutate } = useMutation(leaveMatch, {
    onSuccess: async (response) => {
      if (response.ok) {
        dispatch(matchesListActions.deleteLeaveMatch({id: matchesState.selectedMatch?._id!}));
        dispatch(matchesListActions.setSelectedMatch(undefined));
        handleCloseModal();
        toast({
          title: 'Leave match',
          description: 'You left the match.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Leave match',
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

  const handleLeaveMatch = () => {
    mutate(matchesState.selectedMatch?._id!);
  };
  
  const handleCloseModal = () => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isLeaveMatch', value: false}));
    onClose();
  };

  return (
    <ModalAlert
      isOpen={isOpen}
      onClose={() => handleCloseModal()}
      onContinue={handleLeaveMatch}
      title="Leave match"
      description={`Are you sure? You would request to a team mate to add you again afterwards`}
      continueLabel="Leave match"
    />
  );
}

export default LeaveMatchModal;
