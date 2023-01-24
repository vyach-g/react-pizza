import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  searchBy: string;
  sortBy: string;
  orderBy: string;
  catBy: string;
  currentPage: string;
};

export const fetchPizza = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizza',
  async (params) => {
    const { searchBy, catBy, sortBy, orderBy, currentPage } = params;
    const res = await axios.get<Pizza[]>(
      `https://63abe7eafdc006ba6068ad16.mockapi.io/items?page=${currentPage}&limit=4&` +
        searchBy +
        catBy +
        sortBy +
        orderBy,
    );
    return res.data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },

  // {
  //   [fetchPizza.pending]: (state, action) => {
  //     state.items = [];
  //     state.status = 'loading';
  //   },
  //   [fetchPizza.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizza.rejected]: (state, action) => {
  //     state.items = [];
  //     state.status = 'error';
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
