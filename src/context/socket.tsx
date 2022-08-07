import socketClient, { Socket } from 'socket.io-client'
import { BASE_URL } from '@/lib/config'
import { createContext, FC, ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import { setAccountId } from '@/redux/slices/socketSlice'

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
      })

      socket.emit('join', token)
      socket.on('joined', (accountId) => {
        dispatch(setAccountId(accountId))
      })
      return () => {
        socket.off('joined')
        socket.disconnect()
      }
    }
  }, [token])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}