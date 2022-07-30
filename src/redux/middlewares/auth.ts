import { MiddlewareAPI, Dispatch, Action } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { ReduxState } from '../slices/authSlice'

export const authValidator =
  ({ getState, dispatch }: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: Action) => {
    // console.log(action)
    // if (typeof action === 'function') {
    //   const state = getState() as ReduxState
    //   const today = Date.now()
    //   console.log(action)
    //   const tokenExpiration = Number(state.auth.user?.tokenExpiration)
    //   const refreshTokenExpiration = Number(
    //     state.auth.user?.refreshTokenExpiration,
    //   )

    //   if (today > refreshTokenExpiration) {
    //     toast.error('Expired session, login again', { id: 'expired-session' })
    //   }

    //   if (today > tokenExpiration) {
    //     return dispatch(refreshToken())
    //     console.log({ today, tokenExpiration, refreshTokenExpiration })
    //   }
    // }

    next(action)
  }
