import { useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks/useRedux'
import { socket } from '@/context/socket'
import { Dispatch } from '@reduxjs/toolkit'

interface ListenerInterface {
  event?: string
  action?: Dispatch
}
const useSocket = () => {
  const { accountId } = useAppSelector((state) => state.socket)

  useEffect(() => {
    socket.on(accountId as string, (msg) => {
      console.log(msg)
    })
    console.log(socket.connected)

    return () => {
      socket.off(accountId as string)
    }
  }, [])

  const listener = ({ event, action }: ListenerInterface) => {
    if (event && action) {
      socket.on(event, (data) => {
        action(data)
      })
    }
  }

  const removeListener = ({ event }: ListenerInterface) => {
    socket.off(event)
  }

  return { listener, removeListener }
}

export default useSocket
