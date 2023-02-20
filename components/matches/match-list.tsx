import type { NextPage } from 'next';
import { FormControl, FormLabel, IconButton, Image, Input, useDisclosure, useToast } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useRef, MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import { FullMatch } from '../../interfaces/Match';
import ModalAlert from '../layout/modal-alert';
import LeaveIcon from '../../assets/svg/leave.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../interfaces/State';
import { matchesListActions } from '../../store/matches-list.slice';
import DeleteMatchModal from './modals/delete-match.modal';
import LeaveMatchModal from './modals/leave-match.modal';
import UpdateMatchModal from './modals/update-match.modal';

const MatchList: NextPage = () => {

  const matchesState = useSelector((state: RootState) => state.matchesList );
  const dispatch = useDispatch();
  

  const {
    isOpen: fulltimeModalIsOpen,
    onOpen: fulltimeModalOnOpen,
    onClose: fulltimeModalOnClose,
  } = useDisclosure();

  const homeScoreRef = useRef() as MutableRefObject<HTMLInputElement>;
  const awayScoreRef = useRef() as MutableRefObject<HTMLInputElement>;

  const router = useRouter();

  const goToMatchDetails = (matchId: string) => {
    router.push(`/matches/${matchId}`);
  };

  const showDeleteMatchModal = (match: FullMatch) => {
    dispatch(matchesListActions.setSelectedMatch(match));
    dispatch(matchesListActions.setMatchModalAction({action: 'isDeleteMatch', value: true }));
  };

  const showLeaveMatchModal = (match: FullMatch) => {
    dispatch(matchesListActions.setSelectedMatch(match));
    dispatch(matchesListActions.setMatchModalAction({action: 'isLeaveMatch', value: true }));
  };

  const showFullTimeModal = (match: FullMatch) => {
    dispatch(matchesListActions.setSelectedMatch(match));
    fulltimeModalOnOpen();
  };

  const showUpdateMatchModal = (match: FullMatch) => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isUpdateMatch', value: true }));
    dispatch(matchesListActions.setSelectedMatch(match));
  };

  const handleFulltime = () => {
    if(homeScoreRef.current.value.trim() === '' || awayScoreRef.current.value.trim() === '' ) {
      return;
    }

    const request: FullMatch = {
      ...matchesState.selectedMatch!,
      fullTime: true,
      homeScore: +homeScoreRef.current.value,
      awayScore: +awayScoreRef.current.value
    };

    // mutateUpdateMatch(request);
  };

  const matchesListMap = matchesState.matches.map(
    ({
      _id,
      date,
      location,
      away_team,
      home_team,
      fullTime,
      homeScore,
      awayScore,
    }) => {
      return (
        <section className={styles.section} key={_id}>
          <div
            className={styles.container}
            onClick={() => goToMatchDetails(_id)}
          >
            <div className={styles.matchDetails}>
              <Team
                name={home_team.name}
                image={home_team.shield}
                fullTime={fullTime}
                isWinner={homeScore > awayScore}
                score={homeScore}
                width={120}
                height={120}
              />

              <div className={styles.containerVS}>
                <Image
                  className={styles.versusIcon}
                  src={'/images/vs-icon.png'}
                  alt="Icon versus"
                  width={55}
                  height={45}
                ></Image>
                <div className={styles.details}>
                  <h2>{date}</h2>
                  <h2>{location}</h2>
                  {
                    fullTime &&
                    <h2 className={styles.fullTime}>Full-time</h2>
                  }
                </div>
              </div>

              <Team
                name={away_team.name}
                image={away_team.shield}
                fullTime={fullTime}
                isWinner={awayScore > homeScore}
                score={awayScore}
                width={120}
                height={120}
              />
            </div>
          </div>
          <div className={styles.options}>
            <IconButton
              colorScheme="teal"
              size="md"
              mb={2}
              disabled={fullTime}
              aria-label="Edit match"
              onClick={() =>
                showUpdateMatchModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<SettingsIcon />}
            />
            <IconButton
              colorScheme="red"
              size="md"
              mb={2}
              aria-label="Deleted match"
              onClick={() =>
                showDeleteMatchModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<DeleteIcon />}
            />
            <IconButton
              colorScheme="linkedin"
              size="md"
              aria-label="Deleted match"
              mb={2}
              disabled={fullTime}
              onClick={() =>
                showLeaveMatchModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<LeaveIcon />}
            />
            <IconButton
              colorScheme="green"
              disabled={fullTime}
              size="md"
              aria-label="Full time"
              onClick={() =>
                showFullTimeModal({
                  _id,
                  date,
                  location,
                  away_team,
                  home_team,
                  fullTime,
                  homeScore,
                  awayScore,
                })
              }
              icon={<CheckCircleIcon />}
            />
          </div>
        </section>
      );
    }
  );

  return (
    <>
      {matchesListMap}
      <DeleteMatchModal />
      <LeaveMatchModal />
      <UpdateMatchModal />
      <ModalAlert
        isOpen={fulltimeModalIsOpen}
        onClose={fulltimeModalOnClose}
        onContinue={handleFulltime}
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
    </>
  );
};

export default MatchList;
