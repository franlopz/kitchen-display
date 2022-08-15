import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as auth from '@/services/auth'
import { Settings } from '@/hooks/useOnBoarding'
import { initialUser } from '@/lib/getUser'
import { AuthState, ReduxState } from '@/interfaces/ReduxState'

const initialState: AuthState = {
  user: initialUser,
  loading: false,
  error: null,
  success: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: auth.LoginProps, { rejectWithValue }) => {
    try {
      const data = await auth.login({ email, password })
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      const { message } = error as Error
      if (message) {
        return rejectWithValue(message)
      }
    }
  },
)

export const checkToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as ReduxState
    const today = Date.now()
    const tokenExpiration = Number(state.auth.user?.tokenExpiration)
    const refreshTokenExpiration = Number(
      state.auth.user?.refreshTokenExpiration,
    )

    if (today > refreshTokenExpiration) {
      return rejectWithValue('Expired session, login again')
    }

    if (today > tokenExpiration) {
      try {
        const data = await auth.refresh()
        const newUserState = { ...state.auth.user, ...data }
        localStorage.setItem('user', JSON.stringify(newUserState))
        return newUserState
      } catch (error) {
        const { message } = error as Error
        if (message) {
          return rejectWithValue(message)
        }
      }
    }
    return state
  },
)

export const signup = createAsyncThunk(
  'auth/signup',
  async (props: auth.SignUpProps, { rejectWithValue }) => {
    try {
      const data = await auth.signup(props)
      return data
    } catch (error) {
      const { message } = error as Error
      if (message) {
        return rejectWithValue(message)
      }
    }
  },
)

export const userLogin = createAsyncThunk(
  'auth/user',
  async (pin: string, { rejectWithValue }) => {
    try {
      const data = await auth.userLogin(pin)
      return data
    } catch (error) {
      const { message } = error as Error
      if (error) {
        return rejectWithValue(message)
      }
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user')
})

export const initUsers = createAsyncThunk(
  'auth/init',
  async (props: Settings, { rejectWithValue, getState }) => {
    const state = getState() as ReduxState
    const newState = { ...state.auth.user, setupCompleted: true }
    try {
      const data = await auth.initUsers(props)
      localStorage.setItem('user', JSON.stringify(newState))
      return data
    } catch (error) {
      const { message } = error as Error
      if (message) {
        return rejectWithValue(message)
      }
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = { ...state.user, ...action.payload }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
      })
      .addCase(initUsers.fulfilled, (state) => {
        state.loading = false
        if (state.user) state.user = { ...state.user, setupCompleted: true }
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.loading = false
        if (state.user)
          state = {
            setupCompleted: state.user.setupCompleted,
            ...action.payload,
          }
      })
  },
})

export default authSlice.reducer
