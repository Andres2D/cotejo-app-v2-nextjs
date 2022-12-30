import { ICreateMatchState, IMatchDetails } from './Match';
import { IProfileState } from './Profile';

export interface RootState {
  createMatch: ICreateMatchState;
  matchDetails: IMatchDetails;
  profile: IProfileState;
}
