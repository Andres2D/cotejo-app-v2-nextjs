import { ICreateMatchState } from "../interfaces/Match";
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

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
  away_players: [
    {
      _id: '63460e19837a188ab3792176',
      name: 'Andres Alcaraz',
      nationality: 'Canada',
      position: 'RM',
      image: 'https://lh3.googleusercontent.com/a/ALm5wu3E6trGcHwafmkXYujBFoPSvAbXCpazQ68-Zwnyww=s96-c'
    },
    {
      _id: '6354990441df157b4d8d314e',
      name: 'Mohamed Salah',
      nationality: 'Egypt',
      position: 'S',
      image: 'http://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png'
    },
    {
      _id: '63573b75e129b671e9b85472',
      name: 'Darwin Nunez',
      nationality: 'Uruguay',
      position: 'S',
      image: 'http://www.wycliffe.ca/wp-content/uploads/2021/03/member-fallback-user-image.png'
    },
  ],
  home_players: [],
  current_step: 0
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
    removePlayer
  }
});

export const createMatchActions = createMatchSlice.actions;
export default createMatchSlice.reducer;
