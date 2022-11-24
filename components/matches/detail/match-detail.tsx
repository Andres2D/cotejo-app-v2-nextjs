import type { NextPage } from 'next';
import { matchDetailsMock } from '../../../mock/match.mock';
import FieldLayout from './field/field';

interface Props {
  matchId: string;
}

const MatchDetailsLayout: NextPage<Props> = ({matchId}) => {

  return (
    <>
      <FieldLayout />
    </>
  );
}

export default MatchDetailsLayout;
