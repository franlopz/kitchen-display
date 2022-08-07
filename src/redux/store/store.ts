import { configureStore } from '@reduxjs/toolkit'
import displayReducer from '../slices/displaySlice'
import authReducer from '../slices/authSlice'
import socketReducer from '../slices/socketSlice'

export const store = configureStore({
  reducer: {
    display: displayReducer,
    auth: authReducer,
    socket: socketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
