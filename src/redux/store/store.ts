import { configureStore } from '@reduxjs/toolkit'
import displayReducer from '../slices/displaySlice'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    display: displayReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
