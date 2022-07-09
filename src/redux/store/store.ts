import { configureStore } from '@reduxjs/toolkit'
import displayReducer from '../slices/displaySlice'

export const store = configureStore({
  reducer: {
    display: displayReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
