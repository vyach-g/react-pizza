import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: { filter, pizza },
});
