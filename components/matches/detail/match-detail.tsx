import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../interfaces/State';
import ChangePlayerModal from './avatar/change-player.modal';
import FieldLayout from './field/field';
import FieldHeader from './field/header';
import styles from './match-detail.module.scss';

const MatchDetailsLayout: NextPage = () => {
  const matchDetails = useSelector((state: RootState) => state.matchDetails);
  const homeTeam = matchDetails.match.home_team;
  const awayTeam = matchDetails.match.away_team;

  const homeAverage: number =
    matchDetails.home.length > 0
    ? Math.floor(matchDetails.home.map((player) => player.overall).reduce((a, b) => a + b) /
      matchDetails.home.length)
    : 0;
  const awayAverage: number =
    matchDetails.away.length > 0
    ? Math.floor(matchDetails.away.map((player) => player.overall).reduce((a, b) => a + b) /
      matchDetails.away.length)
    : 0;

  return (
    <section>
      <div className={styles.header}>
        <FieldHeader
          teamName={homeTeam.name}
          teamShield={homeTeam.shield}
          teamOverall={homeAverage}
        />
        <FieldHeader
          teamName={awayTeam.name}
          teamShield={awayTeam.shield}
          teamOverall={awayAverage}
          isAway
        />
        <ChangePlayerModal />
      </div>
      <div className={styles.fields}>
        <FieldLayout team={matchDetails.home.slice(0, 11)} />
        <FieldLayout team={matchDetails.away.slice(0, 11)} isAway />
      </div>
    </section>
  );
};

export default MatchDetailsLayout;
