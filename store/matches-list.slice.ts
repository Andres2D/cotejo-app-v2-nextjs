import { 
  createSlice, 
  PayloadAction, 
  CaseReducer
} from '@reduxjs/toolkit';
import { FullMatch, MatchState } from '../interfaces/Match';

type DeleteMatchPayload = { 
  id: string;
};

const initialState: MatchState = {
  matches: [],
  selectedMatch: undefined
};

const setMatchesList: CaseReducer<MatchState, PayloadAction<FullMatch[]>> = 
(state: MatchState, action: PayloadAction<FullMatch[]>) => {
  state.matches = action.payload;
};

const deleteLeaveMatch: CaseReducer<MatchState, PayloadAction<DeleteMatchPayload>> = 
(state: MatchState, action: PayloadAction<DeleteMatchPayload>) => {
  state.matches = state.matches.filter(match => match._id !== action.payload.id)
};

const setSelectedMatch: CaseReducer<MatchState, PayloadAction<FullMatch>> = 
(state: MatchState, action: PayloadAction<FullMatch>) => {
  state.selectedMatch = action.payload;
};

const updateMatch: CaseReducer<MatchState, PayloadAction<FullMatch>> = 
(state: MatchState, action: PayloadAction<FullMatch>) => {
  state.matches = state.matches.map(match => {
    if(match._id === action.payload._id) {
      return {
        ...match, 
        location: action.payload.location, 
        date: action.payload.date,
        fullTime: action.payload.fullTime,
        homeScore: action.payload.homeScore,
        awayScore: action.payload.awayScore
      };
    }else {
      return match;
    }
  })
};

const matchesListSlice = createSlice({
  name: 'matchesList',
  initialState,
  reducers: {
    setMatchesList,
    deleteLeaveMatch,
    setSelectedMatch,
    updateMatch
  }
});

export const matchesListActions = matchesListSlice.actions;
export default matchesListSlice.reducer;
