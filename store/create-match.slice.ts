import { ICreateMatchState } from "../interfaces/Match";
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { IPlayerList } from '../interfaces/Player';

interface IPayload {
  input: 'home_team_name' | 'home_team_shield' | 'away_team_name' | 'away_team_shield',
  value: string
}

interface INumberPayload {
  input: 'players_number' | 'current_step',
  value: number
}


const initialState: ICreateMatchState = {
  home_team_name: '',
  home_team_shield: '',
  away_team_name: '',
  away_team_shield: '',
  players_number: 16,
  away_players: [],
  home_players: [],
  current_step: 1
};

const updateInput: CaseReducer<ICreateMatchState, PayloadAction<IPayload>> = 
  (state: ICreateMatchState, action: PayloadAction<IPayload>) => {
  const { input, value } = action.payload;
  state[input] = value;
}

const updateInputNumber: CaseReducer<ICreateMatchState, PayloadAction<INumberPayload>> = 
  (state: ICreateMatchState, action: PayloadAction<INumberPayload>) => {
  const { input, value } = action.payload;
  state[input] = value;
}

const addPlayer: CaseReducer<ICreateMatchState, PayloadAction<IPlayerList>> =
(state: ICreateMatchState, action: PayloadAction<IPlayerList>) => {
  const maxMatchSize = state.players_number / 2;
  if(state.home_players.length < maxMatchSize) {
    state.home_players.push(action.payload);
  }else if(state.away_players.length < maxMatchSize) {
    state.away_players.push(action.payload);
  }
}

const removePlayer: CaseReducer<ICreateMatchState, PayloadAction<string>> =
(state: ICreateMatchState, action: PayloadAction<string>) => {
  state.home_players = state.home_players.filter(p => p._id !== action.payload);
  state.away_players = state.away_players.filter(p => p._id !== action.payload);
}

const createMatchSlice = createSlice({
  name: 'createMatch',
  initialState,
  reducers: {
    updateInput,
    updateInputNumber,
    removePlayer,
    addPlayer
  }
});

export const createMatchActions = createMatchSlice.actions;
export default createMatchSlice.reducer;
