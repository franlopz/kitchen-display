import useOrders from '@/hooks/useOrders'
import { Order, Item } from '@/interfaces/Order'
import { useAppDispatch } from '@/redux/hooks/useRedux'
import { checkToken } from '@/redux/slices/authSlice'
import { updateOrder } from '@/redux/slices/displaySlice'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import styles from './OrderCard.module.css'

interface Props {
  order: Order
  screen: string
}

const OrderCard: FC<Props> = ({ order, screen }) => {
  const { _id, type, number, seller, table, createdAt, orders, isVoided } =
    order

  const { ordersGroup, getStatus } = useOrders({
    orders,
    createdAt,
  })

  const navigate = useNavigate()

  const [buttonCaption, setButtonCaption] = useState<string>('Listo')

  const [buttonInLineStyle, setButtonInLineStyle] = useState<
    React.CSSProperties | undefined
  >(undefined)

  const dispatch = useAppDispatch()

  const clickHandler = async () => {
    if (buttonCaption === 'Listo') {
      setButtonCaption('Confirmar')
      setButtonInLineStyle({ backgroundColor: '#2f80ed' })
    }
    if (buttonCaption === 'Confirmar') {
      await dispatch(checkToken())
        .unwrap()
        .then()
        .catch((error) => {
          toast.error(error)
          navigate('/logout')
          throw new Error('token invalid')
        })
      setButtonCaption('Cargando...')
      await dispatch(updateOrder({ _id, isDone: 'true' }))
        .unwrap()
        .then()
        .catch(() => {
          setButtonCaption('Listo')
          setButtonInLineStyle(undefined)
          return toast.error(
            (t) => {
              return (
                <span>
                  Error while marking order as completed
                  <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
                </span>
              )
            },
            { duration: Infinity },
          )
        })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonCaption('Listo')
      setButtonInLineStyle(undefined)
    }, 3500)

    return () => clearInterval(interval)
  }, [buttonCaption])

  return (
    <div className={styles.container}>
      <Header
        screen={screen}
        number={number}
        type={type.name}
        seller={seller}
        table={table}
        isVoided={isVoided}
        createdAt={createdAt}
      />
      <div className={styles.orders}>
        {ordersGroup.map(([category, orders]) => (
          <div key={category} className={styles['order-group']}>
            <p className={styles['category-name']}>{category}</p>
            {orders.map((item: Item) => (
              <div key={item._id} className={styles['order-container']}>
                <div className={styles['order-item']}>
                  <p>{item.quantity}</p>
                  <p>{item.name}</p>
                </div>
                <p className={styles.portion}>{item.portion}</p>
                <div className={styles['tag-container']}>
                  {item.tags.map((tag) => (
                    <p key={tag.name} className={styles.tag}>{`${
                      tag.quantity !== 1 ? tag.quantity + ' x' : ''
                    } ${tag.name}`}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className={`${styles.button} ${getStatus(screen)}`}
        style={buttonInLineStyle}
        onClick={clickHandler}
      >
        {buttonCaption}
      </button>
    </div>
  )
}

export default OrderCard
