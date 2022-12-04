import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { IMatchDetails } from '../interfaces/Match';
import { ISelectPayload } from '../interfaces/Player';

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
  away: [],
  playersSelected: []
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

const selectPlayer: CaseReducer<IMatchDetails, PayloadAction<ISelectPayload>> = 
  (state: IMatchDetails, action: PayloadAction<ISelectPayload>) => {

  if(state.playersSelected.find(p => p.playerId === action.payload.playerId)){
    state.playersSelected = [];
    return;
  }

  state.playersSelected.push(action.payload);

  if(state.playersSelected.length > 1 ) {

    if(state.playersSelected[0].isAway === state.playersSelected[1].isAway) {
      const [first, second] = state.playersSelected;
  
      const firstPlayer = state[first.isAway ? 'away' : 'home'].filter(p => p.player._id === first.playerId)[0];
      const secondPlayer = state[first.isAway ? 'away' : 'home'].filter(p => p.player._id === second.playerId)[0];
  
      state[first.isAway ? 'away' : 'home'] = state[first.isAway ? 'away' : 'home'].map(t => {
        return t.player._id === first.playerId ? secondPlayer : (
          t.player._id === second.playerId ? firstPlayer : t
        );
      });
    }

    state.playersSelected = [];
  }
}

const matchDetailSlice = createSlice({
  name: 'matchDetails',
  initialState,
  reducers: {
    setMatchState,
    updateInput,
    selectPlayer
  }
});

export const matchDetailsActions = matchDetailSlice.actions;
export default matchDetailSlice.reducer;
