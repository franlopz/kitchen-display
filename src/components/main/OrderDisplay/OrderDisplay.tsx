import OrderCard from '../OrderCard/OrderCard'
import styles from './OrderDisplay.module.css'
import Masonry from 'react-masonry-css'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import useSocket from '@/hooks/useSocket'
import { useEffect } from 'react'
import { Order } from '@/interfaces/Order'
import { addOrder, orderUpdated } from '@/redux/slices/displaySlice'
import notificationSound from '../../../assets/notification.mp3'
import { User } from '@/interfaces/ReduxState'
import Footer from '@/components/Footer/Footer'

const OrderDisplay = () => {
  const { orders, selectedScreens, settings } = useAppSelector(
    (state) => state.display,
  )
  const { userId } = useAppSelector((state) => state.auth?.user) as User

  const dispatch = useAppDispatch()

  const { listener, removeListener } = useSocket()
  const audioPlayer = new Audio(notificationSound)

  useEffect(() => {
    selectedScreens[userId as string]?.map((screen) => {
      listener({
        event: `${screen.area}:${screen.screen}/new`,
        action: (data) => {
          dispatch(addOrder(data))
          audioPlayer.play()
        },
      })
      return listener({
        event: `${screen.area}:${screen.screen}/updateStatus`,
        action: (data) => dispatch(orderUpdated(data)),
      })
    })

    return () => {
      selectedScreens[userId as string]?.map((screen) => {
        removeListener({ event: `${screen.area}:${screen.screen}/new` })
        return removeListener({
          event: `${screen.area}:${screen.screen}/updateStatus`,
        })
      })
    }
  }, [dispatch, listener, removeListener, selectedScreens])

  if (Object.keys(selectedScreens[userId as string] || {})?.length === 0) {
    return null
  }
  return (
    <div className={styles.container}>
      {selectedScreens[userId as string]?.map((screen) => {
        const identifier = `${screen.area}: ${screen.screen}` as string

        return (
          <div
            className={styles['column-container']}
            key={identifier}
            style={{
              width: settings[identifier]?.width ?? '100%',
              height: '100%',
            }}
          >
            <h4 className={styles['screen-header']}>{screen.screen}</h4>
            {orders[identifier]?.length === 0 ? (
              <p className={styles.alert}>No orders</p>
            ) : (
              ''
            )}
            <Masonry
              key={identifier}
              breakpointCols={settings[identifier]?.columns ?? 1}
              className={styles['my-masonry-grid']}
              columnClassName={styles['my-masonry-grid_column']}
            >
              {orders[identifier]?.map((order: Order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  screen={screen.screen}
                />
              ))}
            </Masonry>
            <Footer />
          </div>
        )
      })}
    </div>
  )
}

export default OrderDisplay
