import TopBar from '@/components/TopBar/TopBar'
import styles from './Main.module.css'
import OrderDisplay from '@/components/main/OrderDisplay/OrderDisplay'
import { useAppSelector } from '@/redux/hooks/useRedux'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Menu from '@/components/Menu/Menu'

const Main = () => {
  const { isConnected } = useAppSelector((state) => state.socket)

  useEffect(() => {
    toast.loading(
      (t) => {
        if (isConnected === 'connected') t.type = 'success'
        if (isConnected === 'disconnected') t.type = 'error'
        if (isConnected === 'connecting') t.type = 'loading'
        return (
          <span>
            <b style={{ textTransform: 'capitalize' }}>{`${isConnected}`}</b>
          </span>
        )
      },
      {
        duration: isConnected === 'connected' ? 2000 : Infinity,
        id: 'isConnected',
      },
    )

    return () => {
      toast.dismiss()
    }
  }, [isConnected])
  return (
    <div className={styles.container}>
      <TopBar />
      <Menu />
      <OrderDisplay />
    </div>
  )
}

export default Main
