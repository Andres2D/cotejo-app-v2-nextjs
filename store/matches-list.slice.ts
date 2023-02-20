import { 
  createSlice, 
  PayloadAction, 
  CaseReducer
} from '@reduxjs/toolkit';
import { FullMatch, MatchesListState } from '../interfaces/Match';

type DeleteMatchPayload = { 
  id: string;
};

type ModalActionPayload = {
  action: 'isDeleteMatch' | 'isLeaveMatch' | 'isUpdateMatch',
  value: boolean
};

const initialState: MatchesListState = {
  matches: [],
  selectedMatch: undefined,
  isDeleteMatch: false,
  isLeaveMatch: false,
  isUpdateMatch: false
};

const setMatchesList: CaseReducer<MatchesListState, PayloadAction<FullMatch[]>> = 
(state: MatchesListState, action: PayloadAction<FullMatch[]>) => {
  console.log('action', action);
  state.matches = action.payload;
};

const deleteLeaveMatch: CaseReducer<MatchesListState, PayloadAction<DeleteMatchPayload>> = 
(state: MatchesListState, action: PayloadAction<DeleteMatchPayload>) => {
  state.matches = state.matches.filter(match => match._id !== action.payload.id)
};

const setSelectedMatch: CaseReducer<MatchesListState, PayloadAction<FullMatch | undefined>> = 
(state: MatchesListState, action: PayloadAction<FullMatch | undefined>) => {
  state.selectedMatch = action.payload;
};

const setMatchModalAction: CaseReducer<MatchesListState, PayloadAction<ModalActionPayload>> = 
(state: MatchesListState, action: PayloadAction<ModalActionPayload>) => {
  state[action.payload.action] = action.payload.value;
};

const updateMatch: CaseReducer<MatchesListState, PayloadAction<FullMatch>> = 
(state: MatchesListState, action: PayloadAction<FullMatch>) => {
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
    updateMatch,
    setMatchModalAction
  }
});

export const matchesListActions = matchesListSlice.actions;
export default matchesListSlice.reducer;
