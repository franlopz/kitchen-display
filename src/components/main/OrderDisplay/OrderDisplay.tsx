import OrderCard from '../OrderCard/OrderCard'
import styles from './OrderDisplay.module.css'
import Masonry from 'react-masonry-css'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import useSocket from '@/hooks/useSocket'
import { useEffect } from 'react'
import { Order } from '@/interfaces/Order'
import { addOrder, orderUpdated } from '@/redux/slices/displaySlice'

const OrderDisplay = () => {
  const { orders, selectedScreens, settings } = useAppSelector(
    (state) => state.display,
  )
  const dispatch = useAppDispatch()

  const { listener, removeListener } = useSocket()

  useEffect(() => {
    selectedScreens.map((screen) => {
      listener({
        event: `${screen.area}:${screen.screen}/new`,
        action: (data) => dispatch(addOrder(data)),
      })
      return listener({
        event: `${screen.area}:${screen.screen}/updateStatus`,
        action: (data) => dispatch(orderUpdated(data)),
      })
    })

    return () => {
      selectedScreens.map((screen) => {
        removeListener({ event: `${screen.area}:${screen.screen}/new` })
        return removeListener({
          event: `${screen.area}:${screen.screen}/updateStatus`,
        })
      })
    }
  }, [dispatch, listener, removeListener, selectedScreens])

  if (selectedScreens.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {selectedScreens.map((screen) => {
        const identifier = `${screen.area}: ${screen.screen}` as string
        return (
          <Masonry
            style={{ width: settings[identifier]?.width }}
            key={identifier}
            breakpointCols={settings[identifier]?.columns}
            className={styles['my-masonry-grid']}
            columnClassName={styles['my-masonry-grid_column']}
          >
            {orders[identifier]?.map((order: Order) => (
              <OrderCard key={order._id} order={order} screen={screen.screen} />
            ))}
          </Masonry>
        )
      })}
    </div>
  )
}

export default OrderDisplay
