import { Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../interfaces/State';
import ChangePlayerModal from './avatar/change-player.modal';
import FieldLayout from './field/field';
import styles from './match-detail.module.scss';
import LeaveIcon from '../../../assets/svg/leave.svg';
import MatchDetailsSkeleton from '../../skeletons/match-details-skeleton';
import { initialState } from '../../../store/match-details.slice';
import LeaveMatchModal from '../modals/leave-match.modal';
import { matchesListActions } from '../../../store/matches-list.slice';

const MatchDetailsLayout: NextPage = () => {
  const matchDetails = useSelector((state: RootState) => state.matchDetails);
  const dispatch = useDispatch();

  if(matchDetails === initialState) {
    return <MatchDetailsSkeleton />
  }

  const handleLeaveMatchModalOpen = () => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isLeaveMatch', value: true }));
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
            onClick={handleLeaveMatchModalOpen}
          >
            Leave match
          </Button>
        }
      </section>
      <LeaveMatchModal navigateToMatches/>
    </>
  );
};

export default MatchDetailsLayout;
