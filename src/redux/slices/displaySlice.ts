import { Order } from '@/pages/Main/Main'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import orders from '@/components/main/OrderCard/order.json'

interface ScreensData {
  [screen: string]: Order[]
}

interface Settings {
  [screen: string]: {
    width: string
    columns: number
    time1: number
    time2: number
  }
}

interface DisplayState {
  orders: ScreensData
  screens: string[]
  selectedScreen: string[]
  settings: Settings
  status: string
  error: string | null
}

const initialState: DisplayState = {
  orders: {},
  screens: [],
  selectedScreen: [],
  settings: {},
  status: 'idle',
  error: null,
}

const getData = (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 4000)
  })

export const fetchOrders = createAsyncThunk('display/fetchOrders', async () => {
  const user = localStorage.getItem('user')
  const currentScreens = JSON.parse(
    window.localStorage.getItem('selectedScreens') || '[]',
  )
  const screenSettings = JSON.parse(
    window.localStorage.getItem('screenSettings') || '{}',
  )

  const response = await getData(orders)
  const screens = Object.keys(response)
  console.log(response, currentScreens, screenSettings, user, screens)
  const state = {
    ...initialState,
    status: 'succeeded',
    orders,
    screens,
    settings: screenSettings,
    selectedScreen: currentScreens.length === 0 ? [screens[0]] : currentScreens,
  }
  return state
})

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    selectScreen: (state, action: PayloadAction<string[]>) => {
      for (const screen of action.payload) {
        const tabExist = state.selectedScreen.includes(screen)
        const selectedScreens = state.selectedScreen
        if (tabExist === false) {
          state.selectedScreen = [...selectedScreens, screen]
        }
        if (tabExist && selectedScreens.length > 1) {
          const newTabs = selectedScreens.filter(
            (existingTab) => existingTab === screen,
          )
          state.selectedScreen = newTabs
        }
      }
    },
    saveSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        return action.payload
      })
  },
})

export const { selectScreen, saveSettings } = displaySlice.actions
export default displaySlice.reducer
