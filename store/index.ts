import { configureStore } from '@reduxjs/toolkit';
import createMatchSlice from './create-match.slice';
import matchDetailsSlice from './match-details.slice';

const store = configureStore({
  reducer: {
    createMatch: createMatchSlice,
    matchDetails: matchDetailsSlice
  }
});

export default store;
