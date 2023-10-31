import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

type Items = {
  id: number;
  imgURL: string;
  title: string;
  description: string;
  price: number;
  category: number;
  rating: number;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface requestSliceState {
  items: Items[];
  status: Status;
}

const initialState: requestSliceState = {
  items: [],
  status: Status.LOADING // loading - success - error
}

export const fetchComputerItems = createAsyncThunk<Items[], Record<string, string>>('parts/fetchComputerItems', async (params) => {
  const {category, pageNumber, sort} = params
  const {data} = await axios.get<Items[]>(`https://64b6ab4bdf0839c97e15f4e7.mockapi.io/items?${pageNumber}${category}${sort}`);
  return data;
});

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Items[]>){
        state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComputerItems.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
    });
    builder.addCase(fetchComputerItems.fulfilled, (state, action: PayloadAction<Items[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
    });
    builder.addCase(fetchComputerItems.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
    });
  }
})

export const { setItems } = requestSlice.actions;

export default requestSlice.reducer;