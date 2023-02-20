import type { NextPage } from 'next';
import { IconButton, Image } from '@chakra-ui/react';
import { DeleteIcon, SettingsIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import styles from './match-list.module.scss';
import Team from './team';
import { FullMatch } from '../../interfaces/Match';
import LeaveIcon from '../../assets/svg/leave.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../interfaces/State';
import { matchesListActions } from '../../store/matches-list.slice';
import DeleteMatchModal from './modals/delete-match.modal';
import LeaveMatchModal from './modals/leave-match.modal';
import UpdateMatchModal from './modals/update-match.modal';
import FullTimeModal from './modals/full-time.modal';

const MatchList: NextPage = () => {

  const matchesState = useSelector((state: RootState) => state.matchesList );
  const dispatch = useDispatch();
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
    dispatch(matchesListActions.setMatchModalAction({action: 'isFullTime', value: true }));
  };

  const showUpdateMatchModal = (match: FullMatch) => {
    dispatch(matchesListActions.setMatchModalAction({action: 'isUpdateMatch', value: true }));
    dispatch(matchesListActions.setSelectedMatch(match));
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
      <FullTimeModal />
    </>
  );
};

export default MatchList;
