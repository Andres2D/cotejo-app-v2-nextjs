import { ICreateMatchState, IMatchDetails, MatchesListState } from './Match';
import { IProfileState } from './Profile';

export interface RootState {
  createMatch: ICreateMatchState;
  matchDetails: IMatchDetails;
  profile: IProfileState;
  matchesList: MatchesListState
}
