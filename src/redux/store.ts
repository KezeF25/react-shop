import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import request from './slices/requestBackendSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    request,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();