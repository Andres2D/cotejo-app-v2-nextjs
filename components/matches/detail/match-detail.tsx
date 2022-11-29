import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../interfaces/State';
import FieldLayout from './field/field';
import FieldHeader from './field/header';
import styles from './match-detail.module.css';

const MatchDetailsLayout: NextPage = () => {

  const matchDetails = useSelector((state: RootState) => state.matchDetails);
  const homeTeam = matchDetails.match.home_team;
  const awayTeam = matchDetails.match.away_team;

  return (
    <section>
      <div className={styles.header}>
        <FieldHeader
          teamName={homeTeam.name}
          teamShield={homeTeam.shield}
        />
        <FieldHeader
          teamName={awayTeam.name}
          teamShield={awayTeam.shield}
          isAway
        />
      </div>
      <div className={styles.fields}>
        <FieldLayout 
          team={matchDetails.home.slice(0, 5)}
          />
        <FieldLayout 
          team={matchDetails.away.slice(0, 5)}
          isAway
        />
      </div>
    </section>
  );
}

export default MatchDetailsLayout;
