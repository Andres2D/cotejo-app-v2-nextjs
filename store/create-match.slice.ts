import { ICreateMatchState } from "../interfaces/Match";
import { createSlice, PayloadAction, CaseReducer, current } from '@reduxjs/toolkit';
import { IPlayerList } from '../interfaces/Player';
import { botsData } from '../constants/players-bots-data';

interface IPayload {
  input: 'home_team_name' | 'home_team_shield' | 'away_team_name' | 'away_team_shield' | 'place' | 'date',
  value: string
}

interface INumberPayload {
  input: 'players_number' | 'current_step',
  value: number
}

const initialState: ICreateMatchState = {
  home_team_name: '',
  home_team_shield: 'https://media.api-sports.io/football/teams/40.png',
  away_team_name: '',
  away_team_shield: 'https://media.api-sports.io/football/teams/40.png',
  players_number: 16,
  away_players: [],
  home_players: [],
  current_step: 0,
  date: '',
  place: ''
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

  const currentPlayers = [...current(state.home_players), ...current(state.away_players)];

  if(
    action.payload &&
    currentPlayers.filter(pla => pla._id === action.payload._id).length > 0) {
    return;
  }

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

const autoCompletePlayers: CaseReducer<ICreateMatchState> = 
(state: ICreateMatchState) => {
  const playersAdded = [...current(state.home_players), ...current(state.away_players)];
  const availableBots = botsData.filter(bot => !playersAdded.includes(bot));
  const missingPlayers = current(state).players_number - playersAdded.length;

  for (let i = 0; i < missingPlayers; i++) {
    addPlayer(state, {payload: availableBots[i], type: ''});
  }
}

const createMatchSlice = createSlice({
  name: 'createMatch',
  initialState,
  reducers: {
    updateInput,
    updateInputNumber,
    removePlayer,
    addPlayer,
    autoCompletePlayers,
    resetStore: () => initialState
  }
});

export const createMatchActions = createMatchSlice.actions;
export default createMatchSlice.reducer;
