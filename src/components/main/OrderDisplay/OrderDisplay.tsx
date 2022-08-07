import OrderCard from '../OrderCard/OrderCard'
import styles from './OrderDisplay.module.css'
import Masonry from 'react-masonry-css'
import { useAppDispatch, useAppSelector } from '@/redux/hooks/useRedux'
import useSocket from '@/hooks/useSocket'
import { useEffect } from 'react'

const OrderDisplay = () => {
  const { orders, selectedScreen, settings } = useAppSelector(
    (state) => state.display,
  )
  const dispatch = useAppDispatch()

  const { listener, removeListener } = useSocket()

  useEffect(() => {
    selectedScreen.map((screen) =>
      listener({ event: screen, action: dispatch }),
    )

    return () => {
      selectedScreen.map((screen) => removeListener({ event: screen }))
    }
  }, [dispatch, listener, removeListener, selectedScreen])

  if (selectedScreen.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {selectedScreen.map((screen) => (
        <Masonry
          style={{ width: settings[screen]?.width }}
          key={screen}
          breakpointCols={settings[screen]?.columns}
          className={styles['my-masonry-grid']}
          columnClassName={styles['my-masonry-grid_column']}
        >
          {orders[screen]?.map((order) => (
            <OrderCard key={order.number} order={order} screen={screen} />
          ))}
        </Masonry>
      ))}
    </div>
  )
}

export default OrderDisplay
