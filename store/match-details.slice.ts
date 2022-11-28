import { createSlice, PayloadAction, CaseReducer, current } from '@reduxjs/toolkit';
import { IMatchDetails } from '../interfaces/Match';

interface IPayload {
  input: 'home_team' | 'away_team',
  value: string
}

const initialState: IMatchDetails = {
  match: {
    _id: '',
    home_team: {
      _id: '',
      formation: 't',
      name: '',
      shield: ''
    },
    away_team: {
      _id: '',
      formation: 't',
      name: '',
      shield: ''
    },
    date: '',
    location: '',
  },
  home: [],
  away: []
};

const setMatchState: CaseReducer<IMatchDetails, PayloadAction<IMatchDetails>> = 
  (state: IMatchDetails, action: PayloadAction<IMatchDetails>) => {
    const { match, away, home } = action.payload;
    state.match = match;
    state.home = home;
    state.away = away;
}

const updateInput: CaseReducer<IMatchDetails, PayloadAction<IPayload>> = 
  (state: IMatchDetails, action: PayloadAction<IPayload>) => {
  const { input, value } = action.payload;
  if(input === 'home_team') {
    state.match.home_team.formation = value;
  }else{
    state.match.away_team.formation = value;
  }
}

const matchDetailSlice = createSlice({
  name: 'matchDetails',
  initialState,
  reducers: {
    setMatchState,
    updateInput
  }
});

export const matchDetailsActions = matchDetailSlice.actions;
export default matchDetailSlice.reducer;
