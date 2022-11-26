import type { NextPage } from 'next';
import { matchDetailsMock } from '../../../mock/match.mock';
import FieldLayout from './field/field';
import FieldHeader from './field/header';
import styles from './match-detail.module.css';

interface Props {
  matchId: string;
}

const MatchDetailsLayout: NextPage<Props> = ({matchId}) => {

  const { match, home, away } = matchDetailsMock;
  const homeTeamName = match.home_team.name;
  const awayTeamName = match.away_team.name;

  return (
    <section>
      <div className={styles.header}>
        <FieldHeader
          teamName={homeTeamName}
          teamShield={match.home_team.shield}
        />
        <FieldHeader
          teamName={awayTeamName}
          teamShield={match.away_team.shield}
          isAway
        />
      </div>
      <div className={styles.fields}>
        <FieldLayout 
          team={home.slice(0, 4)}
          />
        <FieldLayout 
          team={away.slice(0, 4)}
          isAway
        />
      </div>
    </section>
  );
}

export default MatchDetailsLayout;
