import { GET_ALL, UPDATE_ORDER } from '@/lib/config'

const fetchInitGetJWToken = () => {
  const user = localStorage.getItem('user')
  const { token, refreshToken } = user
    ? JSON.parse(user)
    : { token: '', refreshToken: '' }

  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
      'refresh-token': refreshToken,
    },
  }
}

const fetchInitPathJWToken = () => {
  const user = localStorage.getItem('user')
  const { token, refreshToken } = user
    ? JSON.parse(user)
    : { token: '', refreshToken: '' }

  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      token,
      'refresh-token': refreshToken,
    },
  }
}

export const getAll = async (params: { [key: string]: string }) => {
  try {
    const urlParams = new URLSearchParams(params)
    const response = await fetch(
      `${GET_ALL}?${urlParams}`,
      fetchInitGetJWToken(),
    )
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

export const update = async (params: { [key: string]: string }) => {
  try {
    const urlParams = new URLSearchParams(params)
    const response = await fetch(
      `${UPDATE_ORDER}?${urlParams}`,
      fetchInitPathJWToken(),
    )
    if (response.status !== 200) {
      const message = await response.json()
      throw new Error(message)
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}
