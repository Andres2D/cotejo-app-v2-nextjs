import { configureStore } from '@reduxjs/toolkit';
import createMatchSlice from './create-match.slice';

const store = configureStore({
  reducer: {
    createMatch: createMatchSlice
  }
});

export default store;
