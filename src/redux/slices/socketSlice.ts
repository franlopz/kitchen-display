import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SocketState {
  accountId: string | null
  isConnected: 'connected' | 'disconnected' | 'connecting'
}
const initialState: SocketState = {
  isConnected: 'disconnected',
  accountId: null,
}
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload
    },
    setIsConnected: (
      state,
      action: PayloadAction<SocketState['isConnected']>,
    ) => {
      state.isConnected = action.payload
    },
  },
})

export const { setAccountId, setIsConnected } = socketSlice.actions
export default socketSlice.reducer
