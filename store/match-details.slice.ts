import { createSlice, PayloadAction, CaseReducer, current } from '@reduxjs/toolkit';
import { IMatchDetailsState } from '../interfaces/Match';

interface IPayload {
  input: 'home_team_formation' | 'away_team_formation',
  value: string
}

const initialState: IMatchDetailsState = {
  home_team_formation: 't',
  away_team_formation: 't',
};

const updateInput: CaseReducer<IMatchDetailsState, PayloadAction<IPayload>> = 
  (state: IMatchDetailsState, action: PayloadAction<IPayload>) => {
  const { input, value } = action.payload;
  state[input] = value;
}

const matchDetailSlice = createSlice({
  name: 'matchDetails',
  initialState,
  reducers: {
    updateInput
  }
});

export const matchDetailsActions = matchDetailSlice.actions;
export default matchDetailSlice.reducer;
