import { ICreateMatchState, IMatchDetailsState } from './Match';

export interface RootState {
  createMatch: ICreateMatchState;
  matchDetails: IMatchDetailsState;
}
