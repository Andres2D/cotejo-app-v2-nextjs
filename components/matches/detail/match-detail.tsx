import type { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../interfaces/State';
import ChangePlayerModal from './avatar/change-player.modal';
import FieldLayout from './field/field';
import styles from './match-detail.module.scss';

const MatchDetailsLayout: NextPage = () => {
  const matchDetails = useSelector((state: RootState) => state.matchDetails);

  return (
    <section className={styles.fields}>
      <ChangePlayerModal />
      <FieldLayout team={matchDetails.home.slice(0, 11)} />
      <FieldLayout team={matchDetails.away.slice(0, 11)} isAway />
    </section>
  );
};

export default MatchDetailsLayout;
