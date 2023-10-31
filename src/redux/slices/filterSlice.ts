import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
  sortOption: 'desc' | 'asc';
};

export interface filterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: Sort;
}

const initialState: filterSliceState = {
  searchValue: "",
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "популярности (убыв.)",
    sortProperty: "rating",
    sortOption: "desc",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilter(state, action: PayloadAction<filterSliceState>) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
