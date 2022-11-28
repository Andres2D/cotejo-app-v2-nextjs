import { ICreateMatchState, IMatchDetails } from './Match';

export interface RootState {
  createMatch: ICreateMatchState;
  matchDetails: IMatchDetails;
}
