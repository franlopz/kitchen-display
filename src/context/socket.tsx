import socketClient, { Socket } from 'socket.io-client'
import { BASE_URL } from '@/lib/config'
import { createContext, FC, ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import { setAccountId, setIsConnected } from '@/redux/slices/socketSlice'
import { fetchOrders } from '@/redux/slices/displaySlice'

interface Props {
  children: ReactNode
}
export let socket: Socket
export const SocketContext = createContext({})

export const SocketContextProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const token = user?.token

  useEffect(() => {
    if (Boolean(token) && Boolean(!socket?.connected)) {
      socket = socketClient(BASE_URL, {
        query: { token },
        transports: ['websocket'],
        reconnection: true,
      })

      socket.on('connect', () => {
        socket.emit('join', token)
        dispatch(
          fetchOrders({
            isDone: false,
          }),
        )
      })

      socket.on('joined', (accountId) => {
        dispatch(setAccountId(accountId))
        dispatch(setIsConnected('connected'))
      })

      socket.on('disconnect', () => {
        dispatch(setIsConnected('disconnected'))
      })

      socket.io.on('reconnect_attempt', () => {
        dispatch(setIsConnected('connecting'))
      })

      return () => {
        socket.off('joined')
        dispatch(setIsConnected('disconnected'))
        socket.disconnect()
      }
    }
  }, [dispatch, token])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
