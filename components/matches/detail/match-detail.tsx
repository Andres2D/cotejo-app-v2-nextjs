import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { RootState } from '../../../interfaces/State';
import ChangePlayerModal from './avatar/change-player.modal';
import FieldLayout from './field/field';
import styles from './match-detail.module.scss';
import LeaveIcon from '../../../assets/svg/leave.svg';
import ModalAlert from '../../layout/modal-alert';
import { leaveMatch } from '../../../services/api-configuration';
import MatchDetailsSkeleton from '../../skeletons/match-details-skeleton';
import { initialState } from '../../../store/match-details.slice';

const MatchDetailsLayout: NextPage = () => {
  const matchDetails = useSelector((state: RootState) => state.matchDetails);
  const { 
    isOpen: leaveMatchModalIsOpen, 
    onOpen: leaveMatchModalOnOpen,
    onClose: leaveMatchModalOnClose 
  } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const { mutate: mutateLeaveMatch } = useMutation(leaveMatch, {
    onSuccess: async (response) => {
      if(response.ok) {
        router.push('/matches', undefined, {  })
      } else {
        toast({
          title: 'Leave match',
          description: "Something went wrong, please try again later.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        leaveMatchModalOnClose();
      }
    },
    onError: () => {
      // TODO: handle error
    }
  });

  if(matchDetails === initialState) {
    return <MatchDetailsSkeleton />
  }

  const handleLeaveMatch = () => {
    mutateLeaveMatch(matchDetails.match._id);
  };

  return (
    <>
      <section className={styles.details}>
        <div className={styles.fields}>
          <ChangePlayerModal />
          <FieldLayout team={matchDetails.home} />
          <FieldLayout team={matchDetails.away} isAway />
        </div>
        {
          !matchDetails.match.fullTime &&
          <Button 
            colorScheme='telegram'
            className={styles.leaveButton}
            rightIcon={<LeaveIcon />}
            onClick={leaveMatchModalOnOpen}
          >
            Leave match
          </Button>
        }
      </section>
      <ModalAlert 
        isOpen={leaveMatchModalIsOpen} 
        onClose={leaveMatchModalOnClose}
        onContinue={handleLeaveMatch}
        title='Leave match'
        description={`Are you sure? You would request to a team mate to add you again afterwards`}
        continueLabel='Leave match'
      />
    </>
  );
};

export default MatchDetailsLayout;
