import {
  INIT_URL,
  LOGIN_URL,
  REFRESH_TOKEN,
  SIGNUP_URL,
  USERLOGIN_URL,
} from '@/lib/config'
import { AnyObject } from 'immer/dist/internal'
import { Settings } from '@/hooks/useOnBoarding'

export interface LoginProps {
  email: string
  password: string
}

export interface SignUpProps {
  email: string
  password: string
  confirmPassword: string
  business: string
}

const fetchInitPOST = (body: AnyObject) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

const fetchInitPOSTWToken = (body?: AnyObject) => {
  const user = localStorage.getItem('user')
  const { token, refreshToken } = user
    ? JSON.parse(user)
    : { token: '', refreshToken: '' }

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
      'refresh-token': refreshToken,
    },
    body: JSON.stringify(body),
  }
}

export const login = async ({ email, password }: LoginProps) => {
  const response = await fetch(LOGIN_URL, fetchInitPOST({ email, password }))
  if (response.status !== 200) {
    throw new Error('Login failed')
  }
  const data = await response.json()
  return data
}

export const refresh = async () => {
  const response = await fetch(REFRESH_TOKEN, fetchInitPOSTWToken())
  if (response.status !== 200) {
    throw new Error('Refresh token failed')
  }
  const data = await response.json()
  return data
}

export const signup = async ({
  email,
  password,
  confirmPassword,
  business,
}: SignUpProps) => {
  const response = await fetch(
    SIGNUP_URL,
    fetchInitPOST({ email, password, confirmPassword, business }),
  )
  if (response.status !== 200) {
    const message = await response.json()
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

export const userLogin = async (pin: string) => {
  const response = await fetch(USERLOGIN_URL, fetchInitPOSTWToken({ pin }))
  if (response.status !== 200) {
    const message = await response.json()
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

export const initUsers = async ({ ...body }: Settings) => {
  const response = await fetch(INIT_URL, fetchInitPOSTWToken(body))
  if (response.status !== 200) {
    const message = await response.json()
    throw new Error(message)
  }
  const data = await response.json()
  return data
}
