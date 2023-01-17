import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizza = createAsyncThunk('pizza/fetchPizza', async (params) => {
  const { searchBy, catBy, sortBy, orderBy, currentPage } = params;
  const res = await axios.get(
    `https://63abe7eafdc006ba6068ad16.mockapi.io/items?page=${currentPage}&limit=4&` +
      searchBy +
      catBy +
      sortBy +
      orderBy,
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state, action) => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizza.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
