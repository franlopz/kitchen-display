import { Order } from './Order'

export interface Settings {
  [screen: string]: {
    width: string
    columns: number
    time1: number
    time2: number
  }
}

export interface SelectedScreen {
  area: string
  screen: string
}

interface Area {
  area: string
  screens: string[]
}

export interface OrderObject {
  [key: string]: Order[]
}

export interface selectedScreens {
  [key: string]: SelectedScreen[]
}
export interface DisplayState {
  orders: OrderObject
  screens: Area[]
  selectedScreens: selectedScreens
  settings: Settings
  status: string
  error: string | null
}

export interface User {
  token: string
  tokenExpiration: string
  refreshToken: string
  refreshTokenExpiration: string
  userId: string | null
  setupCompleted: boolean
  roleName: string
  userName: string
  areas: Area[]
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  success: boolean
}

interface SocketState {
  accountId: string
}

export interface ReduxState {
  auth: AuthState
  display: DisplayState
  socket: SocketState
}
