import socketClient, { Socket } from 'socket.io-client'
import { SOCKET_URL } from '@/lib/config'
import { createContext, FC, ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import { setAccountId, setIsConnected } from '@/redux/slices/socketSlice'
import { fetchOrders } from '@/redux/slices/displaySlice'
import { checkToken } from '@/redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Props {
  children: ReactNode
}
export let socket: Socket
export const SocketContext = createContext({})

export const SocketContextProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const token = user?.token

  useEffect(() => {
    dispatch(checkToken())
      .unwrap()
      .then(() => {
        if (Boolean(token) && Boolean(!socket?.connected)) {
          socket = socketClient(SOCKET_URL, {
            path: '/socket.io/',
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
      })
      .catch(() => {
        toast.error('Session expired. Login again')
        navigate('/logout')
      })
  }, [dispatch, token])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
