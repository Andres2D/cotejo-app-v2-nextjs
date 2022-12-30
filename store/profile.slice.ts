import { 
  createSlice, 
  PayloadAction, 
  CaseReducer,
} from '@reduxjs/toolkit';
import { IProfile, IStats } from '../interfaces/Player';

import { IProfileState } from '../interfaces/Profile';

type Profile = 
    'image' 
  | 'flag' 
  | 'name' 
  | 'nationality' 
  | 'position';

type Stats = 
    'overall' 
  | 'defense' 
  | 'dribbling' 
  | 'passing' 
  | 'peace'
  | 'physical' 
  | 'shooting'

interface IPayload {
  prop: Profile;
  value: string;
}

interface INumberPayload {
  prop: Stats;
  value: number;
}

const initialState: IProfileState = {
  profile: {
    image: '',
    flag: '',
    name: '',
    nationality: '',
    overall: 0,
    position: ''
  },
  stats: {
    defense: 0,
    dribbling: 0,
    passing: 0,
    peace: 0,
    physical: 0,
    shooting: 0
  }
};

const setProfile: CaseReducer<IProfileState, PayloadAction<IProfile>> = 
  (state: IProfileState, action: PayloadAction<IProfile>) => {
    console.log(action);
  state.profile = action.payload;
}

const setStats: CaseReducer<IProfileState, PayloadAction<IStats>> = 
  (state: IProfileState, action: PayloadAction<IStats>) => {
  state.stats = action.payload;
}

const updateInput: CaseReducer<IProfileState, PayloadAction<IPayload>> = 
  (state: IProfileState, action: PayloadAction<IPayload>) => {
  const { prop, value } = action.payload;
  state.profile[prop] = value;
}

const updateInputNumber: CaseReducer<IProfileState, PayloadAction<INumberPayload>> = 
  (state: IProfileState, action: PayloadAction<INumberPayload>) => {
  const { prop, value } = action.payload;
  prop === 'overall' 
    ? state.profile[prop] = value 
    : state.stats[prop] = value;
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateInput,
    updateInputNumber,
    setProfile,
    setStats
  }
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
