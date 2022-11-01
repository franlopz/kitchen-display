import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import orders from '@/components/main/OrderCard/order.json'
import {
  DisplayState,
  ReduxState,
  Settings,
  selectedScreens,
  User,
} from '@/interfaces/ReduxState'
import * as orderAPI from '@/services/order'

const initialState: DisplayState = {
  orders: {},
  screens: [],
  selectedScreens: {},
  settings: {},
  status: 'idle',
  error: null,
  isDrawerOpened: false,
}

export const fetchOrders = createAsyncThunk(
  'display/fetchOrders',
  async (
    params: { [key: string]: string | boolean },
    { getState, rejectWithValue },
  ) => {
    try {
      const orders = {}
      const state = getState() as ReduxState
      const selectedScreens = state.display.selectedScreens
      const { userId } = state.auth.user as User
      for (const screen of selectedScreens[userId as string] || []) {
        const response = await orderAPI.getAll({ ...params, ...screen })
        orders[`${screen.area}: ${screen.screen}`] = response
      }

      return orders
    } catch (error) {
      const { message } = error as Error
      if (error) {
        return rejectWithValue(message)
      }
    }
  },
)

export const initializeState = createAsyncThunk(
  'display/initializeState',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as ReduxState
      const { userId } = state.auth.user as User
      const screenSettings = JSON.parse(
        window.localStorage.getItem('screenSettings') || '{}',
      )

      const screens = state.auth.user?.areas

      const savedSelectedScreens = JSON.parse(
        window.localStorage.getItem('selectedScreens') || '{}',
      )
      let selectedScreens: selectedScreens = {}

      const savedSelectedScreensLength =
        savedSelectedScreens[userId as string]?.length || 0

      if (savedSelectedScreensLength === 0) {
        selectedScreens = {
          ...savedSelectedScreens,
          [userId as string]: [
            {
              area: state.auth.user?.areas[0].area as string,
              screen: state.auth.user?.areas[0].screens[0] as string,
            },
          ],
        }
      }

      if (savedSelectedScreensLength !== 0 && savedSelectedScreens) {
        selectedScreens = { ...savedSelectedScreens }
      }
      const newState = {
        ...initialState,
        screens,
        settings: screenSettings,
        selectedScreens,
      } as DisplayState

      return newState
    } catch (error) {
      const { message } = error as Error
      if (error) {
        return rejectWithValue(message)
      }
    }
  },
)

export const updateOrder = createAsyncThunk(
  'display/updateOrder',
  async (params: { [key: string]: string }, { getState, rejectWithValue }) => {
    const state = getState() as ReduxState
    const orders = state.display.orders
    try {
      const data = await orderAPI.update(params)

      const filteredOrders = orders[`${data.area}: ${data.screen}`].filter(
        (order) => order._id !== data._id,
      )
      if (data.isDone === false) filteredOrders.push(data)

      const newOrderState = {
        ...orders,
        [`${data.area}: ${data.screen}`]: filteredOrders,
      }

      return newOrderState
    } catch (error) {
      const { message } = error as Error
      if (error) {
        return rejectWithValue(message)
      }
    }
  },
)

interface selectScreens {
  tab: string[]
  userId: string
}
export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    selectScreen: (state, action: PayloadAction<selectScreens>) => {
      const { tab: selection, userId } = action.payload
      for (const screen of selection) {
        const screenSplittedString = screen.split(': ')
        const selectionArea = screenSplittedString[0]
        const selectionScreen = screenSplittedString[1]
        const selectedScreens = state.selectedScreens
        const selectedScreensArray = selectedScreens[userId as string].map(
          (screen) => {
            return `${screen.area}: ${screen.screen}`
          },
        )

        const tabExist = selectedScreensArray.includes(screen)
        if (tabExist === false) {
          state.selectedScreens[userId as string] = [
            ...selectedScreens[userId as string],
            { area: selectionArea, screen: selectionScreen },
          ]
        }
        if (
          tabExist &&
          Object.keys(selectedScreens[userId as string]).length > 1
        ) {
          const newTabs = selectedScreens[userId as string].filter(
            (existingTab) =>
              screen === `${existingTab.area}: ${existingTab.screen}`,
          )
          state.selectedScreens[userId as string] = newTabs
        }
      }
    },
    saveSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload
    },
    orderUpdated: (state, action) => {
      const orders = state.orders
      const { id, screenIdentifier, order } = action.payload

      if (order.isDone === false) {
        let exists = false
        const newOrders = orders[screenIdentifier].map((screenOrder) => {
          if (screenOrder._id === id) {
            exists = true
            return order
          }
          return screenOrder
        })
        if (exists === false) {
          newOrders.push(order)
          newOrders.sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
          )
        }
        state.orders[screenIdentifier] = newOrders
      }

      if (order.isDone === true) {
        const filteredOrders = orders[screenIdentifier].filter(
          (screenOrder) => {
            if (screenOrder._id === id) return false
            return true
          },
        )
        state.orders[screenIdentifier] = filteredOrders
      }
    },
    addOrder: (state, action) => {
      const { savedOrder, screenIdentifier } = action.payload
      state.orders[screenIdentifier].push(savedOrder)
    },
    openDrawer: (state) => {
      state.isDrawerOpened = !state.isDrawerOpened
    },
  },
  extraReducers(builder) {
    builder
      .addCase(initializeState.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initializeState.fulfilled, (state, action) => {
        if (action.payload) {
          return (state = { ...action.payload })
        }
      })
      .addCase(initializeState.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        if (action.payload) state.orders = action.payload
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        if (action.payload) state.orders = action.payload
      })
      .addCase(updateOrder.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const {
  selectScreen,
  saveSettings,
  orderUpdated,
  addOrder,
  openDrawer,
} = displaySlice.actions
export default displaySlice.reducer
