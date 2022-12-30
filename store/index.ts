import { configureStore } from '@reduxjs/toolkit';
import createMatchSlice from './create-match.slice';
import matchDetailsSlice from './match-details.slice';
import profileSlice from './profile.slice';

const store = configureStore({
  reducer: {
    createMatch: createMatchSlice,
    matchDetails: matchDetailsSlice,
    profile: profileSlice
  }
});

export default store;
