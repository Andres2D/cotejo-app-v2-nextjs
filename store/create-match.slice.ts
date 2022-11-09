import { ICreateMatchState } from "../interfaces/Match";
import { createSlice, PayloadAction, CaseReducer, AnyAction } from '@reduxjs/toolkit';

interface IPayload {
  input: 'home_team_name' | 'home_team_shield' | 'away_team_name' | 'away_team_shield',
  value: string;
}

const initialState: ICreateMatchState = {
  home_team_name: '',
  home_team_shield: '',
  away_team_name: '',
  away_team_shield: '',
  // current_step: 0
};

const updateInput: CaseReducer<ICreateMatchState, PayloadAction<IPayload>> = 
  (state: ICreateMatchState, action: PayloadAction<IPayload>) => {
  const { input, value } = action.payload;
  state[input] = value;
}

const createMatchSlice = createSlice({
  name: 'createMatch',
  initialState,
  reducers: {
    updateInput
  }
});

export const createMatchActions = createMatchSlice.actions;
export default createMatchSlice.reducer;
