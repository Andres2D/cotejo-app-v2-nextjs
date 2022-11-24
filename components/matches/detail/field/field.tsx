import type { NextPage } from 'next';
import { matchDetailsMock } from '../../../../mock/match.mock';
import FieldHeader from './header';
import styles from './field.module.css';

const FieldLayout: NextPage = () => {

  const { match } = matchDetailsMock;
  const homeTeamName = match.home_team.name;
  const awayTeamName = match.away_team.name;

  return (
    <section className={styles.header}>
      <FieldHeader
        teamName={homeTeamName}
        teamShield={match.home_team.shield}
      />
      <FieldHeader
        teamName={awayTeamName}
        teamShield={match.away_team.shield}
        isAway
      />
    </section>
  );
}

export default FieldLayout;
