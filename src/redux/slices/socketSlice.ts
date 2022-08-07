import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SocketState {
  accountId: string | null
}
const initialState: SocketState = {
  accountId: null,
}
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload
    },
  },
})

export const { setAccountId } = socketSlice.actions
export default socketSlice.reducer
